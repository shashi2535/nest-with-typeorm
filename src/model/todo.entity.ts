import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity({ name: 'todo' })
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  first_name: string;
  @Column()
  user_uuid: string;
  @Column()
  password: string;
  @Column()
  public_id: string;
  @Column({
    enum: ['user', 'admin'],
    type: 'enum',
    enumName: 'role_enum_type',
  })
  role: string;
  @Column()
  avtar: string;
  @Column()
  created_at: Date;
  @Column()
  updated_at: Date;
}
