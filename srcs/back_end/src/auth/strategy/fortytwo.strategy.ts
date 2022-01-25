import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { Strategy, VarifyCallback } from 'passport-42';
import { ConfigService } from '@nestjs/config';
import { CodeService } from 'src/code/code.service';

@Injectable()
export class FortyTwoStrategy extends PassportStrategy(Strategy, 'fortyTwo') {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
    private readonly codeService: CodeService,
  ) {
    super({
      clientID: configService.get<string>('FT_CLIENT_ID'),
      clientSecret: configService.get<string>('FT_CLIENT_SECRET'),
      callbackURL: configService.get<string>('FT_CALLBACK'),
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VarifyCallback,
  ): Promise<any> {
    const { id, username, emails } = profile;
    const user = {
      id: +id,
      name: username,
      email: emails[0].value,
    };
    return done(null, user);
  }
}
