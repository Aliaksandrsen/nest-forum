import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SectionsController } from './sections.controller';
import { Section } from './sections.entity';
import { SectionsService } from './sections.service';
import { Topic } from '../topics/topics.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Section, Topic])],
  providers: [SectionsService],
  controllers: [SectionsController],
})
export class SectionModule {}
