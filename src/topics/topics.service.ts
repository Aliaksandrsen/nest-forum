import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Section } from '../sections/sections.entity';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { Topic } from './topics.entity';

@Injectable()
export class TopicsService {
  constructor(
    @InjectRepository(Topic)
    private topicsRepository: Repository<Topic>,
    @InjectRepository(Section)
    private sectionsRepository: Repository<Section>,
  ) {}

  async getAll(): Promise<Topic[]> {
    return this.topicsRepository.find({ relations: ['section'] });
  }

  async getById(id: string): Promise<Topic> {
    const topic = await this.topicsRepository.findOne(id, {
      relations: ['section'],
    });

    if (!topic) {
      throw new NotFoundException(`Topic #${id} not found`);
    }

    return topic;
  }

  async create(createTopicDto: CreateTopicDto): Promise<Topic> {
    if (!createTopicDto.sectionId) {
      throw new Error(`Sectin id is requared`);
    }

    const topic = new Topic();
    topic.title = createTopicDto.title;

    const section = await this.sectionsRepository.findOne(
      createTopicDto.sectionId,
    );
    if (!section) {
      throw new NotFoundException(
        `No section with id #${createTopicDto.sectionId}`,
      );
    }
    topic.section = section;

    const res = await this.topicsRepository.save(topic);
    return res;
  }

  async remove(id: string): Promise<Topic> {
    const topic = await this.topicsRepository.findOne(id);

    if (!topic) {
      throw new NotFoundException(`Topic #${id} not found`);
    }

    return this.topicsRepository.remove(topic);
  }

  async update(id: string, updatedTopicDto: UpdateTopicDto): Promise<Topic> {
    const topic = await this.topicsRepository.preload({
      id: +id,
      ...updatedTopicDto,
    });

    if (!topic) {
      throw new NotFoundException(`Topic #${id} not found`);
    }

    return this.topicsRepository.save(topic);
  }
}
