import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { FortyTwoAuthGuard } from './fortytwo-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('local')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(FortyTwoAuthGuard)
  @Get('fortytwo')
  async fortyTwoAuth() {
    return;
  }

  @UseGuards(FortyTwoAuthGuard)
  @Get('fortytwo/callback')
  async fortyTwoLogin(@Request() req) {
    // console.log(req.user);
    return await this.authService.loginFortyTwo(req.user);
  }
}
