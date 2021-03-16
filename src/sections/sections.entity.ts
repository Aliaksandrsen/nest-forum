import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Topic } from '../topics/topics.entity';

@Entity() // sql table === 'section'
export class Section {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @OneToMany(() => Topic, (topic) => topic.section)
  topics: Topic[];
}
