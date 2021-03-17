import {
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Put,
  Body,
} from '@nestjs/common';

import { CreateSubtopicDto } from './dto/create-subtopic.dto';
import { UpdateSubtopicDto } from './dto/update-subtopic.dto';
import { Subtopic } from './subtopics.entity';
import { SubtopicsService } from './subtopics.service';

@Controller('subtopics')
export class SubtopicsController {
  constructor(private readonly subtopicsService: SubtopicsService) {}

  @Get()
  getAll(): Promise<Subtopic[]> {
    return this.subtopicsService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): Promise<Subtopic> {
    return this.subtopicsService.getById(id);
  }

  @Post()
  create(@Body() createSubtopicDto: CreateSubtopicDto): Promise<Subtopic> {
    return this.subtopicsService.create(createSubtopicDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Subtopic> {
    return this.subtopicsService.remove(id);
  }

  @Put(':id')
  update(
    @Body() updateSubtopicDto: UpdateSubtopicDto,
    @Param('id') id: string,
  ): Promise<Subtopic> {
    return this.subtopicsService.update(id, updateSubtopicDto);
  }
}
