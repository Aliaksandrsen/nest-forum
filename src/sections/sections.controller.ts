import {
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Put,
  Body,
} from '@nestjs/common';

import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { Section } from './sections.entity';
import { SectionsService } from './sections.service';

@Controller('sections')
export class SectionsController {
  constructor(private readonly sectionsServise: SectionsService) {}

  @Get()
  getAll(): Promise<Section[]> {
    return this.sectionsServise.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): Promise<Section> {
    return this.sectionsServise.getById(id);
  }

  @Post()
  create(@Body() createSectionDto: CreateSectionDto): Promise<Section> {
    return this.sectionsServise.create(createSectionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Section> {
    return this.sectionsServise.remove(id);
  }

  @Put(':id')
  update(
    @Body() updateSectionDto: UpdateSectionDto,
    @Param('id') id: string,
  ): Promise<Section> {
    return this.sectionsServise.update(id, updateSectionDto);
  }
}
