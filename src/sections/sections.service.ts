import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { Section } from './sections.entity';

@Injectable()
export class SectionsService {
  constructor(
    @InjectRepository(Section)
    private sectionsRepository: Repository<Section>,
  ) {}

  async getAll(): Promise<Section[]> {
    return this.sectionsRepository.find();
  }

  async getById(id: string): Promise<Section> {
    return this.sectionsRepository.findOne(id);
  }

  async create(sectionDto: CreateSectionDto): Promise<Section> {
    const section = this.sectionsRepository.create(sectionDto);
    return this.sectionsRepository.save(section);
  }

  async remove(id: string): Promise<Section> {
    const section = await this.sectionsRepository.findOne(id);
    return this.sectionsRepository.remove(section);
  }

  async update(
    id: string,
    updatedSectionDto: UpdateSectionDto,
  ): Promise<Section> {
    const section = await this.sectionsRepository.preload({
      id: +id,
      ...updatedSectionDto,
    });

    return this.sectionsRepository.save(section);
  }
}
