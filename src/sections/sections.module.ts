import { Module } from '@nestjs/common';
import { SectionsController } from './sections.controller';
import { SectionsService } from './sections.service';

@Module({
  providers: [SectionsService],
  controllers: [SectionsController],
})
export class SectionModule {}
