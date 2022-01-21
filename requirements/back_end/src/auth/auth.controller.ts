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
  async login(@Req() req, @Res({ passthrough: true }) res: Response) {
    return await this.authService.login(req.user, res);
  }

  @UseGuards(FortyTwoAuthGuard)
  @Get('login/2fa')
  async login2fa(@Req() req, @Res({ passthrough: true }) res: Response) {
    //request의 otp 코드를 넘겨준다.
    const token = req.body.otpToken;
    return await this.authService.login2fa(req.user.id, token, res);
  }

  @Get('refresh')
  async refresh(@Req() req, @Res() res: Response) {
    const result = await this.authService.refresh(req, res);
    return result;
  }

  @Get('logout')
  async logout(@Res() res: Response) {
    return this.authService.logout(res);
  }
}
