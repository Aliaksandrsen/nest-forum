import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity() // sql table === 'section'
export class Section {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;
}
