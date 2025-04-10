import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UpdateProfileDto } from './dto/update-user.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly mail: MailerService,
  ) {}
  async register(registerDto: RegisterDto) {
    await this.sendVerificationMail({
      data: {
        from: 'test@example.com',
        to: 'test@test.com',
        otp: 123456,
      },
    });
    const user = await this.usersService.create(registerDto);
    const token = await this.jwtService.signAsync(user);
    return { token };
  }
  async login(loginDto: LoginDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [
          {
            email: loginDto.username,
          },
          {
            mobile: loginDto.username,
          },
        ],
      },
    });

    if (!user) {
      throw new NotFoundException('Unable to find user');
    }
    const isPasswordValid = await compare(loginDto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    const token = await this.jwtService.signAsync(user);
    return { token };
  }
  //profile id update
  async profile(user_id: number) {
    return this.usersService.findOne(user_id);
  }
  async updateProfile(user_id: number, updateProfileDto: UpdateProfileDto) {
    return this.usersService.update(user_id, updateProfileDto);
  }

  //mail verification
  async sendVerificationMail(job: any) {
    const { data } = job;
    try {
      await this.mail.sendMail({
        ...data,
        subject: 'Verify Your Email',
        template: 'Verify-email',
        context: {
          otp: data.otp,
        },
      });
    } catch (err) {
      console.log(err);
    }
  }
}
