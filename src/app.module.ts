import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SectionsController } from './sections/sections.controller';
import { SectionsService } from './sections/sections.service';

@Module({
  imports: [],
  controllers: [AppController, SectionsController],
  providers: [AppService, SectionsService],
})
export class AppModule {}
