import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Subtopic } from '../subtopics/subtopics.entity';
import { Message } from './messages.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { User } from '../users/users.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private messagesRepository: Repository<Message>,
    @InjectRepository(Subtopic)
    private subtopicsRepository: Repository<Subtopic>,
    @InjectRepository(User)
    private userssRepository: Repository<User>,
  ) {}

  async getAll(): Promise<Message[]> {
    return this.messagesRepository.find({ relations: ['subtopic', 'user'] });
  }

  async getById(id: string): Promise<Message> {
    const message = await this.messagesRepository.findOne(id, {
      relations: ['subtopic'],
    });

    if (!message) {
      throw new NotFoundException(`Message #${id} not found`);
    }

    return message;
  }

  async create(createMessageDto: CreateMessageDto): Promise<Message> {
    const message = new Message();
    message.title = createMessageDto.title;
    message.content = createMessageDto.content;

    const subtopic = await this.subtopicsRepository.findOne(
      createMessageDto.subtopicId,
    );
    if (!subtopic) {
      throw new NotFoundException(
        `No subtopic with id #${createMessageDto.subtopicId}`,
      );
    }
    message.subtopic = subtopic;

    const user = await this.userssRepository.findOne(createMessageDto.userId);
    if (!user) {
      throw new NotFoundException(
        `No user with id #${createMessageDto.userId}`,
      );
    }
    message.user = user;

    const res = await this.messagesRepository.save(message);
    return res;
  }

  async remove(id: string): Promise<Message> {
    const message = await this.messagesRepository.findOne(id);

    if (!message) {
      throw new NotFoundException(`Message #${id} not found`);
    }

    return this.messagesRepository.remove(message);
  }

  async update(
    id: string,
    updatedMessageDto: UpdateMessageDto,
  ): Promise<Message> {
    const message = await this.messagesRepository.preload({
      id: +id,
      ...updatedMessageDto,
    });

    if (!message) {
      throw new NotFoundException(`Topic #${id} not found`);
    }

    return this.messagesRepository.save(message);
  }
}
