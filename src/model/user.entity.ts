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
  @Column({ select: false })
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
