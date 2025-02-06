import { Type } from 'class-transformer';
import {
  IsNumber,
  IsBoolean,
  IsArray,
  IsOptional,
  Min,
  Max,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateVehicleDto {
  @IsString()
  brand: string;

  @IsString()
  model: string;

  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  year: number;

  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  price: number;

  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  rangeKm: number;

  @IsString()
  color: string;

  @IsString()
  condition: string;

  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  batteryCapacityKWh: number;

  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  chargingSpeedKW: number;

  @IsNumber()
  @Min(1)
  @Max(8)
  @Type(() => Number)
  seats: number;

  @IsString()
  drivetrain: string;

  @IsString()
  location: string;

  @IsBoolean()
  @IsOptional()
  autopilot?: boolean;

  @IsNumber()
  @Min(0)
  @Type(() => Number)
  kilometerCount: number;

  @IsBoolean()
  @IsOptional()
  accidents?: boolean;

  @IsString()
  @IsOptional()
  accidentsDescription: string;

  @IsArray()
  @IsString({ each: true })
  images: string[];

  constructor(partial: Partial<CreateVehicleDto>) {
    Object.assign(this, partial);
  }
}
