import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { AuthRegisterDto } from './dto/auth-register.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && (await bcrypt.compare(pass, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      const access_token = await this.generateToken({
        sub: result.username,
      });
      return { access_token };
    }
    return null;
  }

  async generateToken(payload: any) {
    return this.jwtService.sign(payload);
  }

  async register(authRegisterDto: AuthRegisterDto) {
    const registeredUser = await this.usersService.createUser(authRegisterDto);
    return {
      access_token: await this.generateToken({
        sub: registeredUser.username,
      }),
    };
  }
}
