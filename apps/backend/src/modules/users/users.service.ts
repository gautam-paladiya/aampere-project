import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';
import { AuthRegisterDto } from '../auth/dto/auth-register.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { username } });
  }

  async createUser(authRegisterDto: AuthRegisterDto) {
    const existingUser = await this.findOne(authRegisterDto.username); // Check if user exists

    if (existingUser) {
      throw new ConflictException(`${authRegisterDto.username} already exists`);
    }

    const reqUser = plainToInstance(User, authRegisterDto);
    const hashedPassword = await bcrypt.hash(reqUser.password, 10);
    const user = this.usersRepository.create({
      ...reqUser,
      password: hashedPassword,
    });
    const savedUser = await this.usersRepository.save(user);

    return plainToInstance(AuthRegisterDto, savedUser);
  }
}
