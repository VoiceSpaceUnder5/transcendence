import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { FortyTwoAuthGuard } from './guard/fortytwo-auth.guard';
import {
  PassAccessGuard,
  PassTwoFactorGuard,
} from './decorator/pass.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }

  @PassAccessGuard()
  @PassTwoFactorGuard()
  @UseGuards(FortyTwoAuthGuard)
  @Get('fortytwo')
  async fortyTwoAuth() {
    return;
  }

  @PassAccessGuard()
  @PassTwoFactorGuard()
  @UseGuards(FortyTwoAuthGuard)
  @Get('fortytwo/login')
  async login(@Req() req, @Res({ passthrough: true }) res: Response) {
    return await this.authService.login(req.user, res);
  }

  @PassTwoFactorGuard()
  @Post('login/2fa')
  async login2fa(@Req() req, @Res({ passthrough: true }) res: Response) {
    //request의 otp 코드를 넘겨준다.
    const token = req.body.token;
    return await this.authService.login2fa(req.user, token, res);
  }

  @PassAccessGuard()
  @PassTwoFactorGuard()
  @Get('refresh')
  async refresh(@Req() req, @Res() res: Response) {
    const result = await this.authService.refresh(req, res);
    return result;
  }

  @PassAccessGuard()
  @PassTwoFactorGuard()
  @Get('logout')
  async logout(@Res() res: Response) {
    return this.authService.logout(res);
  }
}
