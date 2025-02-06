import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from '../../stretagies/jwt.strategy';
import { UsersModule } from '../users/users.module';
import { LocalAuthStrategy } from 'src/stretagies/local.strategy';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('app.jwtSecret', { infer: true }), // Get secret from config service
        signOptions: {
          expiresIn: configService.get<string>('app.jwtExpiry', {
            infer: true,
          }),
        },
      }),
    }),
  ],
  providers: [AuthService, JwtStrategy, LocalAuthStrategy],
  controllers: [AuthController],
  exports: [],
})
export class AuthModule {}
