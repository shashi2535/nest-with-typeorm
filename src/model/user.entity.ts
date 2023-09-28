import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email: string;
  @Column()
  first_name: string;
  @Column()
  user_uuid: string;
  @Column()
  password: string;
  @Column()
  public_id: string;
  @Column()
  avtar: string;
  @Column()
  created_at: Date;
  @Column()
  updated_at: Date;
}
