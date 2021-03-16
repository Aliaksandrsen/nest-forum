import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TopicsController } from './topics.controller';
import { Topic } from './topics.entity';
import { Section } from '../sections/sections.entity';
import { TopicsService } from './topics.service';

@Module({
  imports: [TypeOrmModule.forFeature([Topic, Section])],
  providers: [TopicsService],
  controllers: [TopicsController],
})
export class TopicsModule {}
