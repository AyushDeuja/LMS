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

    //check if quantity is less than 0

    if (createBookDto.quantity < 0) {
      throw new NotFoundException('Quantity cannot be less than 0');
    }
    if (createBookDto.quantity === 0 || createBookDto.quantity === null) {
      createBookDto.quantity = 0;
      createBookDto.availability = false;
    } else if (createBookDto.quantity > 0) {
      createBookDto.availability = true;
    }

    //check if book and author already exists
    const existingBookTitle = await this.prisma.book.findFirst({
      where: {
        title: createBookDto.title,
      },
    });
    const existingAuthor = await this.prisma.book.findFirst({
      where: {
        author: createBookDto.author,
      },
    });
    if (existingBookTitle && existingAuthor) {
      throw new NotFoundException('Book and Author already exists');
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
    //check if quantity is less than 0
    if ((updateBookDto.quantity as number) < 0) {
      throw new NotFoundException('Quantity cannot be less than 0');
    }
    if (updateBookDto.quantity === 0 || updateBookDto.quantity === null) {
      updateBookDto.quantity = 0;
      updateBookDto.availability = false;
    } else if ((updateBookDto.quantity as number) > 0) {
      updateBookDto.availability = true;
    }
    await this.findOne(id, updateBookDto.user_id as number);
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
