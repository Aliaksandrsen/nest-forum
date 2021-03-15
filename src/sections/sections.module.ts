import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SectionsController } from './sections.controller';
import { Section } from './sections.entity';
import { SectionsService } from './sections.service';

@Module({
  imports: [TypeOrmModule.forFeature([Section])],
  providers: [SectionsService],
  controllers: [SectionsController],
})
export class SectionModule {}
