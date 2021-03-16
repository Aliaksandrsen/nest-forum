import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Section } from '../sections/sections.entity';

@Entity() // sql table === 'topic'
export class Topic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => Section, (section) => section.topics)
  section: Section;
}
