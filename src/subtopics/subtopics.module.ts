import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Subtopic } from './subtopics.entity';
import { Topic } from '../topics/topics.entity';
import { SubtopicsController } from './subtopics.controller';
import { SubtopicsService } from './subtopics.service';

@Module({
  imports: [TypeOrmModule.forFeature([Subtopic, Topic])],
  controllers: [SubtopicsController],
  providers: [SubtopicsService],
})
export class SubtopicsModule {}
