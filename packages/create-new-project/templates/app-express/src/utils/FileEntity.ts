import { IsNotEmpty, IsString } from 'class-validator';

export class FileEntity {
  @IsNotEmpty()
  buffer: Buffer;

  @IsNotEmpty()
  @IsString()
  filename: string;

  @IsNotEmpty()
  @IsString()
  encoding: string;

  @IsNotEmpty()
  @IsString()
  mimeType: string;
}
