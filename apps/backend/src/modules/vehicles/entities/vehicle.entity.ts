import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('vehicles')
export class Vehicle {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  brand: string;

  @Column()
  model: string;

  @Column()
  year: number;

  @Column({ type: 'decimal' })
  price: number;

  @Column({ type: 'decimal', name: 'range_km' })
  rangeKm: number;

  @Column()
  color: string;

  @Column()
  condition: string;

  @Column({ type: 'decimal', name: 'battery_capacity_kWh' })
  batteryCapacityKWh: number;

  @Column({ type: 'decimal', name: 'charging_speed_kW' })
  chargingSpeedKW: number;

  @Column()
  seats: number;

  @Column()
  drivetrain: string;

  @Column()
  location: string;

  @Column({ default: false })
  autopilot: boolean;

  @Column({ name: 'kilometer_count' })
  kilometerCount: number;

  @Column({ default: false })
  accidents: boolean;

  @Column({ nullable: true, name: 'accidents_description' })
  accidentsDescription?: string;

  @Column('simple-array')
  images: string[];

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
