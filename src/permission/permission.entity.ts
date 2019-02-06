import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany } from 'typeorm';
import { Option } from 'src/option/option.entity';
import { Role } from 'src/role/role.entity';

@Entity('permissions')
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 300 })
  description: string;

  @Column()
  status: boolean;

  @OneToMany(type => Option, option => option.permission)
  options: Option[];

  @ManyToMany(type => Role, role => role.permissions)
  roles: Role[];

  constructor(partial: Partial<Permission>) {
    Object.assign(this, partial);
  }

}
