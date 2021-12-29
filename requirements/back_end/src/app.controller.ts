import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { JwtAccessGuard } from './auth/guard/jwt-auth.guard';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(JwtAccessGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
