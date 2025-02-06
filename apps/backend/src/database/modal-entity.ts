import {
  BaseEntity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export default abstract class ModalEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @CreateDateColumn({
    name: 'created_on',
    default: 'now()',
  })
  createdOn: string;

  @Column({ name: 'created_by', nullable: true })
  createdBy: string;

  @UpdateDateColumn({
    name: 'updated_on',
    default: 'now()',
  })
  updatedOn: string;

  @Column({ name: 'updated_by', nullable: true })
  updatedBy: string;
}
