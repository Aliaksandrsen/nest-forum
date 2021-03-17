import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateSubtopicDto } from './dto/create-subtopic.dto';
import { UpdateSubtopicDto } from './dto/update-subtopic.dto';
import { Subtopic } from './subtopics.entity';
import { Topic } from '../topics/topics.entity';

@Injectable()
export class SubtopicsService {
  constructor(
    @InjectRepository(Topic)
    private topicsRepository: Repository<Topic>,
    @InjectRepository(Subtopic)
    private subtopicsRepository: Repository<Subtopic>,
  ) {}

  async getAll(): Promise<Subtopic[]> {
    return this.subtopicsRepository.find({ relations: ['topic'] });
  }

  async getById(id: string): Promise<Subtopic> {
    const subtopic = await this.subtopicsRepository.findOne(id, {
      relations: ['topic'],
    });

    if (!subtopic) {
      throw new NotFoundException(`Subtopic #${id} not found`);
    }

    return subtopic;
  }

  async create(createSubtopicDto: CreateSubtopicDto): Promise<Subtopic> {
    if (!createSubtopicDto.topicId) {
      throw new NotFoundException(`Topic id is requared`);
    }

    const subtopic = new Subtopic();
    subtopic.title = createSubtopicDto.title;

    const topic = await this.topicsRepository.findOne(
      createSubtopicDto.topicId,
    );
    if (!topic) {
      throw new NotFoundException(
        `No topic with id #${createSubtopicDto.topicId}`,
      );
    }
    subtopic.topic = topic;

    const res = await this.subtopicsRepository.save(subtopic);
    return res;
  }

  async remove(id: string): Promise<Subtopic> {
    const subtopic = await this.subtopicsRepository.findOne(id);

    if (!subtopic) {
      throw new NotFoundException(`Subtopic #${id} not found`);
    }

    return this.subtopicsRepository.remove(subtopic);
  }

  async update(
    id: string,
    updatedSubtopicDto: UpdateSubtopicDto,
  ): Promise<Subtopic> {
    const subtopic = await this.subtopicsRepository.preload({
      id: +id,
      ...updatedSubtopicDto,
    });

    if (!subtopic) {
      throw new NotFoundException(`Subtopic #${id} not found`);
    }

    return this.topicsRepository.save(subtopic);
  }
}
