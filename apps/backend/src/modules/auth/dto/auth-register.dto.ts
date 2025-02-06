import { Exclude } from 'class-transformer';
import { IsString } from 'class-validator';

export class AuthRegisterDto {
  @IsString()
  username!: string;

  @IsString()
  password!: string;

  @IsString()
  firstName!: string;

  @IsString()
  lastName!: string;

  @Exclude()
  createdOn: Date;

  @Exclude()
  updatedOn: Date;

  @Exclude()
  createdBy: string;

  @Exclude()
  updatedBy: string;

  @Exclude()
  id: string;

  @Exclude()
  isActive: boolean;
}
