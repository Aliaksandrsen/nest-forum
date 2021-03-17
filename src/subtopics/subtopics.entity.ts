import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Topic } from '../topics/topics.entity';

@Entity() // sql table === 'subtopic'
export class Subtopic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => Topic, (topic) => topic.subtopics)
  topic: Topic;
}
