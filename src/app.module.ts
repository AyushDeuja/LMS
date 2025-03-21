import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MembersModule } from './members/members.module';
import { BooksModule } from './books/books.module';
import { TransactionsModule } from './transactions/transactions.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ClodinaryService } from './clodinary/clodinary.service';
import { ClodinarynestService } from './generate/clodinarynest/clodinarynest.service';
import { Cloudinary } from './cloudinary/cloudinary';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

@Module({
  imports: [UsersModule, MembersModule, BooksModule, TransactionsModule, CloudinaryModule],
  controllers: [AppController],
  providers: [AppService, ClodinarynestService, Cloudinary, ClodinaryService],
})
export class AppModule {}
