import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  Unique,
} from 'typeorm';
import { Message } from '../messages/messages.entity';

@Entity() // sql table === 'user'
@Unique(['username']) // нельзя создавать пользователей с одним username
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ select: false }) // убираем из выборки
  password: string;

  @OneToMany(() => Message, (message) => message.user)
  messages: Message[];
}
