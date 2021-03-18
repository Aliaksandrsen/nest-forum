import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Message } from '../messages/messages.entity';
import { Topic } from '../topics/topics.entity';

@Entity() // sql table === 'subtopic'
export class Subtopic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @OneToMany(() => Message, (message) => message.subtopic)
  messages: Message[];

  @ManyToOne(() => Topic, (topic) => topic.subtopics)
  topic: Topic;
}
