import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FilehandlerService } from './filehandler.service';

@Module({
  imports: [],
  exports: [],
  controllers: [AppController],
  providers: [AppService, FilehandlerService],
})
export class AppModule {}
