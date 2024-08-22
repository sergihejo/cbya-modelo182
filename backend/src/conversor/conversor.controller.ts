import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
} from '@nestjs/common';
import { ConversorService } from './conversor.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('conversor')
export class ConversorController {
  constructor(private readonly conversorService: ConversorService) {}

  @Get()
  index() {
    return this.conversorService.index();
  }

  @Post('')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File, @Body() body) {
    return this.conversorService.create(file, body);
  }
}
