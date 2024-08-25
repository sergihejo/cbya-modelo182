import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
  Res,
  Query,
} from '@nestjs/common';
import { ConversorService } from './conversor.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
// import { CreateConversorDto } from './dto/create-conversor.dto';

@Controller('conversor')
export class ConversorController {
  constructor(private readonly conversorService: ConversorService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Body() body, @Res() res: Response) {
    const { filePath, fileName, warnings } = this.conversorService.create(file, body);
    res.json({
      downloadUrl: `/conversor/download?filePath=${encodeURIComponent(filePath)}&fileName=${encodeURIComponent(fileName)}`,
      warnings,
    });
  }

  @Get('download')
  downloadFile(
    @Query('filePath') filePath: string,
    @Query('fileName') fileName: string,
    @Res() res: Response,
  ) {
    console.log('Downloading file:', filePath);
    res.download(filePath, fileName, (err) => {
      if (err) {
        console.error('Error downloading the file:', err);
        res.status(500).send('Error downloading the file');
      }
    });
  }
}
