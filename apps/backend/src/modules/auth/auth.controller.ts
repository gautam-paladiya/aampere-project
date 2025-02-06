import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { AuthGuard } from '@nestjs/passport';
import { ErrorResponse, SuccessResponse } from 'src/utils/types';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(
    @Body() authRegisterDto: AuthRegisterDto,
  ): Promise<SuccessResponse<any> | ErrorResponse> {
    const user = await this.authService.register(authRegisterDto);
    return {
      success: true,
      message: 'Registration successful',
      data: user,
    };
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  login(@Request() req): SuccessResponse<any> | ErrorResponse {
    return {
      success: true,
      message: 'Login successful',
      data: req.user,
    };
  }
}
