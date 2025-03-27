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

    return this.prisma.book.create({
      data: createBookDto,
    });
  }

  async findAll() {
    return this.prisma.book.findMany();
  }

  async findOne(id: number) {
    const book = await this.prisma.book.findUnique({
      where: { id },
    });
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return book;
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    await this.findOne(id);
    return this.prisma.book.update({
      where: { id },
      data: updateBookDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.book.delete({
      where: { id },
    });
  }
}
