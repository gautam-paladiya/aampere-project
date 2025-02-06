import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('app.jwtSecret', {
        infer: true,
      }),
    });
  }

  async validate(payload: { sub: string }) {
    const user = await this.usersService.findOne(payload.sub); // Assuming 'sub' is the user ID
    if (!user) {
      return null; // Or throw an exception
    }
    return user; // This will be available as req.user
  }
}
