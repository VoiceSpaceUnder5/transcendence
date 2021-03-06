import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { AccessGuard } from './auth/guard/access.guard';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(AccessGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
