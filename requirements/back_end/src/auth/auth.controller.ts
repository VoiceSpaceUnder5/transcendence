import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { FortyTwoAuthGuard } from './guard/fortytwo-auth.guard';
import { JwtAccessGuard } from './guard/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(JwtAccessGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }

  @UseGuards(FortyTwoAuthGuard)
  @Get('fortytwo')
  async fortyTwoAuth() {
    return;
  }

  @UseGuards(FortyTwoAuthGuard)
  @Get('fortytwo/login')
  async fortyTwoLogin(@Req() req, @Res({ passthrough: true }) res: Response) {
    console.log('요청 헤더', req.headers);
    console.log('응답 헤더', res.getHeaders());
    return await this.authService.loginFortyTwo(req.user, res);
  }
}
