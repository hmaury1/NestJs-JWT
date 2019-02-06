import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Permission } from 'src/permission/permission.entity';
import { User } from 'src/user/user.entity';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column()
  status: boolean;

  @ManyToMany(type => Permission, permissions => permissions.roles)
  @JoinTable()
  permissions: Permission[];

  @ManyToMany(type => User, user => user.roles)
  users: User[];

  constructor(partial: Partial<Role>) {
    Object.assign(this, partial);
  }

}
