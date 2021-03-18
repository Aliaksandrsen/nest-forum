import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { Subtopic } from '../subtopics/subtopics.entity';
import { User } from '../users/users.entity';

@Entity() // sql table === 'message'
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @ManyToOne(() => User, (user) => user.messages)
  user: User;

  @ManyToOne(() => Subtopic, (subtopic) => subtopic.messages)
  subtopic: Subtopic;
}
