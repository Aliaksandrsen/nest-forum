import { Injectable, NotFoundException } from '@nestjs/common';
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
    const section = await this.sectionsRepository.findOne(id);

    if (!section) {
      throw new NotFoundException(`Section #${id} not found`);
    }

    return section;
  }

  async create(createSectionDto: CreateSectionDto): Promise<Section> {
    const section = this.sectionsRepository.create(createSectionDto);

    return this.sectionsRepository.save(section);
  }

  async remove(id: string): Promise<Section> {
    const section = await this.sectionsRepository.findOne(id);

    if (!section) {
      throw new NotFoundException(`Section #${id} not found`);
    }

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

    if (!section) {
      throw new NotFoundException(`Section #${id} not found`);
    }

    return this.sectionsRepository.save(section);
  }
}
