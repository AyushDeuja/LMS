import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaClient } from '@prisma/client';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class BooksService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly cloudinary: CloudinaryService,
  ) {}
  async create(createBookDto: CreateBookDto) {
    //cloudinary image logic here
    if (createBookDto.book_img) {
      createBookDto.book_img = await this.cloudinary.uploadFile(
        createBookDto.book_img,
      );
    }
    if (!createBookDto.quantity) {
      createBookDto.quantity = 0;
    }
    if (createBookDto.quantity < 0) {
      throw new Error('Quantity cannot be negative');
    }
    if (createBookDto.availability === undefined) {
      createBookDto.availability = false;
    }

    if (createBookDto.quantity === 0) {
      createBookDto.availability = false;
    } else if (createBookDto.quantity > 0) {
      createBookDto.availability = true;
    }

    return this.prisma.book.create({
      data: createBookDto,
    });
  }

  async findAll(user_id: number) {
    return this.prisma.book.findMany({
      where: {
        user_id,
      },
    });
  }

  async findOne(id: number, user_id: number) {
    const book = await this.prisma.book.findUnique({
      where: { id, user_id },
    });
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return book;
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    await this.findOne(id, updateBookDto.user_id as number);

    if (!updateBookDto.quantity) {
      updateBookDto.quantity = 0;
    }
    if (updateBookDto.quantity < 0) {
      throw new Error('Quantity cannot be negative');
    }
    if (updateBookDto.availability === undefined) {
      updateBookDto.availability = false;
    }

    if (updateBookDto.quantity === 0) {
      updateBookDto.availability = false;
    } else if (updateBookDto.quantity > 0) {
      updateBookDto.availability = true;
    }

    return this.prisma.book.update({
      where: { id },
      data: updateBookDto,
    });
  }

  async remove(id: number, user_id: number) {
    await this.findOne(id, user_id);
    return this.prisma.book.delete({
      where: { id },
    });
  }
}
