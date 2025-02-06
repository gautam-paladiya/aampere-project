import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column()
  password: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @CreateDateColumn({
    name: 'created_on',
  })
  createdOn: string;

  @Column({ name: 'created_by', nullable: true })
  createdBy: string;

  @UpdateDateColumn({
    name: 'updated_on',
  })
  updatedOn: string;

  @Column({ name: 'updated_by', nullable: true })
  updatedBy: string;
}
