import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity() // sql table === 'user'
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;
}
