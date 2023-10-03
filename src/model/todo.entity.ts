import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
@Entity({ name: 'todo' })
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  description: string;
  @Column()
  todo_uuid: string;
  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  users_todo: User;
  @Column()
  created_at: Date;
  @Column()
  updated_at: Date;
}
