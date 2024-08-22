import { Module } from '@nestjs/common';
import { ConversorService } from './conversor.service';
import { ConversorController } from './conversor.controller';

@Module({
  controllers: [ConversorController],
  providers: [ConversorService],
})
export class ConversorModule {}
