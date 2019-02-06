import { Entity, Column, PrimaryGeneratedColumn, JoinTable, ManyToMany } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Role } from 'src/role/role.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @Exclude()
  @Column({ length: 50 })
  password: string;

  @Column({ length: 300 })
  email: string;

  @Column()
  status: boolean;

  @ManyToMany(type => Role, role => role.users)
  @JoinTable()
  roles: Role[];

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }

}
