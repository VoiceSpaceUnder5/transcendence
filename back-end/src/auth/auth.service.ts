import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(id: number, name: string): Promise<User> {
    const user = await this.usersService.findUserById(id);
    if (user && user.name === name) {
      return user;
    }
    return null;
  }

  async login(user: User) {
    const payload = { username: user.name, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload), // sign함수 : 우리가 너헝준 객체를 포함하여 JWT 토큰 생성 개꿀
    };
  }
}
