import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  userName: string;

  @IsString()
  firstName: string;

  @IsString()
  lasttName: string;

  @IsString()
  password: string;
}
