import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { RefreshTokenService } from 'src/refreshtoken/refreshtoken.service';
import { CreateUserInput } from 'src/users/dto/create-user.input';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/user.service';
import { JwtPayload } from './interface/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly refreshTokenService: RefreshTokenService,
  ) {}

  async validateUser(payload: JwtPayload): Promise<User> {
    const user = await this.usersService.findUserById(payload.id);
    return user ? user : null;
  }

  async login(createUserInput: CreateUserInput, res: Response) {
    const user = await this.usersService.create(createUserInput);
    const accessToken = this.createAccessToken(user.id);
    const refreshTokenId = await this.createRefreshTokenToDB(user.id);
    this.setAccessTokenCookie(res, accessToken);
    this.setRefreshTokenCookie(res, refreshTokenId);
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
      maxAge: 300000000000,
      domain: '.ts.io',
    });
  }

  private setRefreshTokenCookie(res: Response, refreshTokenId: string) {
    res.cookie('refreshTokenId', refreshTokenId, {
      maxAge: 600000000000,
      domain: '.ts.io',
    });
  }
}
