import { Injectable, NotAcceptableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { EncryptService } from 'src/encrypt/encrypt.service';
import { RefreshTokenService } from 'src/refreshtoken/refreshtoken.service';
import { CreateUserInput } from 'src/users/dto/create-user.input';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/user.service';
import { Otp } from 'src/utils/otp';
import { JwtPayload } from './interface/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly refreshTokenService: RefreshTokenService,
    private readonly encryptService: EncryptService,
  ) {}

  async validateUser(payload: JwtPayload): Promise<User> {
    const user = await this.usersService.findUserById(payload.id);
    return user ? user : null;
  }

  async login(createUserInput: CreateUserInput, res: Response) {
    const user = await this.usersService.create(createUserInput);
    //여기에서 2fa 활성유저인지 체크
    const accessToken = this.createAccessToken(user.id);
    const refreshTokenId = await this.createRefreshTokenToDB(user.id);
    this.setAccessTokenCookie(res, accessToken);
    this.setRefreshTokenCookie(res, refreshTokenId);
    if (user.twoFactorAuth) {
      return res.redirect(
        `${this.configService.get<string>('FRONT_URI')}/auth/2fa`,
      );
    }
    return res.redirect(`${this.configService.get<string>('FRONT_URI')}/auth`);
  }

  async login2fa(user: User, token: string, res: Response) {
    // const user = await this.usersService.findUserById(userId);
    const decryptedSecret = this.encryptService.decrypt(
      user.twoFactorAuthSecret,
    );
    const validOtp = Otp.varifyOtp(token, decryptedSecret);
    if (!validOtp) {
      throw new NotAcceptableException('2fa 인증 실패');
    }
    const twoFactorToken = this.createTwoFactorToken(user.id);
    this.setTwoFactorTokenCookie(res, twoFactorToken);
    return res.redirect(`${this.configService.get<string>('FRONT_URI')}/auth`);
  }

  async logout(res: Response) {
    res.clearCookie('accessToken', {
      domain: '.ts.io',
    });
    res.clearCookie('refreshTokenId', {
      domain: '.ts.io',
    });
    return res.redirect(`${this.configService.get<string>('FRONT_URI')}`);
  }

  async refresh(req: any, res: Response) {
    try {
      const refreshTokenId = req.cookies.refreshTokenId;
      const refreshToken = await this.refreshTokenService.findOne(
        refreshTokenId,
      );
      const payload = this.jwtService.verify(refreshToken.token, {
        secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
      });
      const accessToken = this.createAccessToken(payload.id);
      this.setAccessTokenCookie(res, accessToken);

      return res.redirect(
        `${this.configService.get<string>('FRONT_URI')}/auth`,
      );
    } catch (err) {
      console.error('리프레시 토큰 유효하지 않음!');
      return res.redirect(`${this.configService.get<string>('FRONT_URI')}`);
    }
  }

  private createAccessToken(userId: number): string {
    const accessToken = this.jwtService.sign(
      { id: userId },
      {
        expiresIn: this.configService.get<string>('ACCESS_TOEKN_TIME'),
        secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
      },
    );
    return accessToken;
  }

  private createTwoFactorToken(userId: number): string {
    const twoFactorToken = this.jwtService.sign(
      { id: userId },
      {
        expiresIn: this.configService.get<string>('ACCESS_TOEKN_TIME'),
        secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
      },
    );
    return twoFactorToken;
  }

  private async createRefreshTokenToDB(userId: number): Promise<string> {
    const refreshToken = this.jwtService.sign(
      { id: userId },
      {
        expiresIn: this.configService.get<string>('REFRESH_TOKEN_TIME'),
        secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
      },
    );
    const refreshTokenId = await this.refreshTokenService
      .create(userId, refreshToken)
      .then((refreshToken) => refreshToken.id);
    return refreshTokenId;
  }

  private setAccessTokenCookie(res: Response, accessToken: string) {
    res.cookie('accessToken', accessToken, {
      maxAge: 60 * 15 * 1000, // 15분
      domain: '.ts.io',
    });
  }

  private setTwoFactorTokenCookie(res: Response, twoFactorToken: string) {
    res.cookie('twoFactorToken', twoFactorToken, {
      maxAge: 60 * 15 * 1000, // 15분
      domain: '.ts.io',
    });
  }

  private setRefreshTokenCookie(res: Response, refreshTokenId: string) {
    res.cookie('refreshTokenId', refreshTokenId, {
      maxAge: 60 * 60 * 24 * 14 * 1000, // 14일
      domain: '.ts.io',
    });
  }
}
