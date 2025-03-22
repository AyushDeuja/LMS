import { Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { Cloudinary } from './cloudinary/cloudinary';
import { CloudinaryProvider } from './cloudinary.provider';

@Module({
  providers: [CloudinaryService, Cloudinary, CloudinaryProvider],
  exports: [CloudinaryProvider, CloudinaryService],
})
export class CloudinaryModule {}
