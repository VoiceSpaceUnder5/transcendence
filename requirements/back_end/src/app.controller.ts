import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { JwtAccessGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAccessGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}