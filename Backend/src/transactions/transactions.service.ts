import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { PrismaClient, ReservationType } from '@prisma/client';

@Injectable()
export class TransactionsService {
  constructor(private readonly prisma: PrismaClient) {}

  async create(createTransactionDto: CreateTransactionDto) {
    const { book_id, member_id, type } = createTransactionDto;

    // Check if book exists
    const book = await this.prisma.book.findUnique({
      where: { id: book_id },
    });
    if (!book) throw new NotFoundException('Book not found');

    // Check if member exists
    const member = await this.prisma.member.findUnique({
      where: { id: member_id },
    });
    if (!member) throw new NotFoundException('Member not found');

    // Count borrows and returns to track active borrow status
    const [borrowCount, returnCount] = await Promise.all([
      this.prisma.transaction.count({
        where: {
          book_id,
          member_id,
          type: ReservationType.borrow,
        },
      }),
      this.prisma.transaction.count({
        where: {
          book_id,
          member_id,
          type: ReservationType.return,
        },
      }),
    ]);

    if (type === ReservationType.borrow) {
      if ((book.quantity as number) <= 0) {
        throw new BadRequestException('Book is not available');
      }

      if (borrowCount > returnCount) {
        throw new BadRequestException('Book already borrowed by the member');
      }
    } else if (type === ReservationType.return) {
      if (borrowCount <= returnCount) {
        throw new BadRequestException('Book not borrowed or already returned');
      }
    }

    // Perform transaction
    return this.prisma.$transaction(async (prisma) => {
      const transaction = await prisma.transaction.create({
        data: createTransactionDto,
      });

      await prisma.book.update({
        where: { id: book_id },
        data: {
          quantity: {
            ...(type === ReservationType.borrow
              ? { decrement: 1 }
              : { increment: 1 }),
          },
          availability:
            type === ReservationType.borrow
              ? (book.quantity as number) - 1 > 0
              : true,
        },
      });

      return transaction;
    });
  }

  async findAll(user_id: number) {
    return this.prisma.transaction.findMany({
      where: {
        user_id,
      },
    });
  }

  async findOne(id: number, user_id: number) {
    const transaction = await this.prisma.transaction.findUnique({
      where: { id, user_id },
    });
    if (!transaction) {
      throw new NotFoundException('Transaction not found');
    }
    return transaction;
  }

  async remove(id: number, user_id: number) {
    await this.findOne(id, user_id);
    return this.prisma.transaction.delete({
      where: { id, user_id },
    });
  }
}
