import { Injectable } from '@nestjs/common';
import { CreateSectionDto } from './dto/create-section.dto';

@Injectable()
export class SectionsService {
  private sections = [];

  getAll() {
    return this.sections;
  }

  getById(id: string) {
    return this.sections.find((section) => section.id === id);
  }

  create(sectionDto: CreateSectionDto) {
    this.sections.push({
      ...sectionDto,
      id: Date.now().toString(),
    });
  }
}
