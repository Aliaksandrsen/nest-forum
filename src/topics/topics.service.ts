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
    return this.topicsRepository.find({ relations: ['section', 'subtopics'] });
  }

  async getById(id: string): Promise<Topic> {
    const topic = await this.topicsRepository.findOne(id, {
      relations: ['section', 'subtopics'],
    });

    if (!topic) {
      throw new NotFoundException(`Topic #${id} not found`);
    }

    return topic;
  }

  async create(createTopicDto: CreateTopicDto): Promise<Topic> {
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
    console.log('TopicsService ~ update ~ updatedTopicDto', updatedTopicDto);
    // нужно ли иметь возможность topics кидать в др sections?
    // 1) тогда придется вытаскивать нужную section по id из репозитория

    const topic = await this.topicsRepository.preload({
      id: +id,
      ...updatedTopicDto,
    });
    console.log('TopicsService ~ update ~ topic', topic);

    if (!topic) {
      throw new NotFoundException(`Topic #${id} not found`);
    }

    return this.topicsRepository.save(topic);
  }
}
