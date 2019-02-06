import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Permission } from 'src/permission/permission.entity';

@Entity('options')
export class Option {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 50, nullable: true })
  icon: string;

  @Column({ length: 300 })
  path: string;

  @Column()
  status: boolean;

  @Column({ nullable: true })
  order: number;

  @Column({ nullable: true })
  parentId: number;

  @ManyToOne(type => Permission, permission => permission.options)
  permission: Permission;

  constructor(partial: Partial<Option>) {
    Object.assign(this, partial);
  }

}
