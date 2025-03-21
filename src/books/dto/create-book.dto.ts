import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateBookDto {
  @IsOptional()
  @IsNumber()
  user_id: number;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  author: string;

  @IsOptional()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsBoolean()
  availability: boolean;
}
