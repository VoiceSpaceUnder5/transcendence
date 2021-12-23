import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/users/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'id', passwordField: 'name' });
  }

  async validate(id: number, name: string): Promise<User> {
    const user = await this.authService.validateUser(id, name);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
