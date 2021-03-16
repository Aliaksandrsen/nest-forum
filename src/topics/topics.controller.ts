import {
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Put,
  Body,
} from '@nestjs/common';

import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { Topic } from './topics.entity';
import { TopicsService } from './topics.service';

@Controller('topics')
export class TopicsController {
  constructor(private readonly topicsService: TopicsService) {}

  @Get()
  getAll(): Promise<Topic[]> {
    return this.topicsService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): Promise<Topic> {
    return this.topicsService.getById(id);
  }

  @Post()
  create(@Body() createSectionDto: CreateTopicDto): Promise<Topic> {
    return this.topicsService.create(createSectionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Topic> {
    return this.topicsService.remove(id);
  }

  @Put(':id')
  update(
    @Body() updateSectionDto: UpdateTopicDto,
    @Param('id') id: string,
  ): Promise<Topic> {
    return this.topicsService.update(id, updateSectionDto);
  }
}
