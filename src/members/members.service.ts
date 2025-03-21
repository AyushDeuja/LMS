import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class MembersService {
  constructor(private readonly prisma: PrismaClient) {}
  async create(createMemberDto: CreateMemberDto) {
    //Logic to manage uniqueness of data i.e email & mobile

    let member = await this.prisma.member.findUnique({
      where: { email: createMemberDto.email },
    });

    if (member) {
      throw new BadRequestException('This email has already been taken');
    }

    member = await this.prisma.member.findUnique({
      where: { mobile: createMemberDto.mobile },
    });

    if (member) {
      throw new BadRequestException('This mobile number is already taken');
    }

    //Create member here
    return this.prisma.member.create({
      data: createMemberDto,
    });
  }

  async findAll() {
    return this.prisma.member.findMany();
  }

  async findOne(id: number) {
    const member = await this.prisma.member.findUnique({
      where: { id },
    });
    if (!member) {
      throw new NotFoundException('Member not found');
    }
    return member;
  }

  async update(id: number, updateMemberDto: UpdateMemberDto) {
    await this.findOne(id);
    return this.prisma.member.update({
      where: { id },
      data: updateMemberDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.member.delete({
      where: { id },
    });
  }
}
