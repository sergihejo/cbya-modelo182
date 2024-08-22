import { Module } from '@nestjs/common';
import { ConversorModule } from './conversor/conversor.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ConversorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
