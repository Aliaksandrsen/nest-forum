import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Section } from '../sections/sections.entity';
import { Subtopic } from '../subtopics/subtopics.entity';

@Entity() // sql table === 'topic'
export class Topic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => Section, (section) => section.topics)
  section: Section;

  @OneToMany(() => Subtopic, (subtopic) => subtopic.topic)
  subtopics: Subtopic[];
}
