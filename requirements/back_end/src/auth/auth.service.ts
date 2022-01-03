import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { CreateUserInput } from 'src/users/dto/create-user.input';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { JwtPayload } from './interface/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(payload: JwtPayload): Promise<User> {
    console.log('Payload : ', payload);
    const user = await this.usersService.findUserById(payload.id);
    return user ? user : null;
  }

  async login(user: User, res?: Response) {
    console.log('In login!');
    if (res) {
      const payload = { id: user.id };
      console.log('로그인 유저 :', user.name);
      const accessToken = this.jwtService.sign(payload, {
        expiresIn: this.configService.get<string>('ACCESS_TOEKN_TIME'),
        secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
      });
      const refreshToken = this.jwtService.sign(payload, {
        expiresIn: this.configService.get<string>('REFRESH_TOKEN_TIME'),
        secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
      });
      res.cookie('accessToken', accessToken, {
        maxAge: 300000000000,
        domain: '.ts.io',
        // maxAge: +this.configService.get<string>('ACCESS_TOKEN_TIME'),
      });
      res.cookie('refreshToken', refreshToken, {
        maxAge: 600000000000,
        domain: '.ts.io',
        // maxAge: +this.configService.get<string>('REFRESH_TOKEN_TIME'),
      });
    }
    return res.redirect(`${this.configService.get<string>('FRONT_URI')}/auth`);
    // return res.status(200);
    // return 'Success';
  }

  async loginFortyTwo(user: CreateUserInput, res: Response) {
    try {
      const existUser = await this.usersService.findUserById(user.id);
      return this.login(existUser, res);
    } catch {
      const newUser = await this.usersService.create(user);
      return this.login(newUser, res);
    }
  }
}
