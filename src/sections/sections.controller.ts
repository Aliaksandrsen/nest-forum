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
import { SectionsService } from './sections.service';

@Controller('sections')
export class SectionsController {
  constructor(private readonly sectionsServise: SectionsService) {}

  @Get()
  getAll() {
    return this.sectionsServise.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.sectionsServise.getById(id);
  }

  @Post()
  create(@Body() createSectionDto: CreateSectionDto) {
    return this.sectionsServise.create(createSectionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return 'Remove ' + id;
  }

  @Put(':id')
  update(@Body() updateSectionDto: UpdateSectionDto, @Param('id') id: string) {
    return 'Update ' + id;
  }
}
