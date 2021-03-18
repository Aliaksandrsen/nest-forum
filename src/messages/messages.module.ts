import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subtopic } from '../subtopics/subtopics.entity';
import { User } from '../users/users.entity';
import { MessagesController } from './messages.controller';
import { Message } from './messages.entity';
import { MessagesService } from './messages.service';

@Module({
  imports: [TypeOrmModule.forFeature([Subtopic, User, Message])],
  controllers: [MessagesController],
  providers: [MessagesService],
})
export class MessagesModule {}
