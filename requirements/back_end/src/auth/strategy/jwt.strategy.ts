import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';
import { JwtPayload } from '../interface/jwt-payload.interface';
import { RefreshTokenService } from 'src/refreshtoken/refreshtoken.service';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(
  Strategy,
  'jwt-access',
) {
  constructor(
    private readonly configureService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => {
          return req?.cookies?.accessToken;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configureService.get<string>('ACCESS_TOKEN_SECRET'),
    });
  }

  async validate(payload: JwtPayload, done: VerifiedCallback) {
    const user = await this.authService.validateUser(payload);
    if (!user) {
      return null;
    }
    return done(null, user);
  }
}

// @Injectable()
// export class JwtRefreshStrategy extends PassportStrategy(
//   Strategy,
//   'jwt-refresh',
// ) {
//   constructor(
//     private readonly configureService: ConfigService,
//     private readonly authService: AuthService,
//     private readonly refreshTokenService: RefreshTokenService,
//   ) {
//     super({
//       jwtFromRequest: ExtractJwt.fromExtractors([
//         (req) => {
//           const refreshTokenId = req?.cookies?.refreshTokenId;
//           let result: string | null;
//           const refresh = this.refreshTokenService
//             .findOne(refreshTokenId) //
//             .then((refresh) => {
//               result = refresh.token;
//             })
//             .catch((err) => {
//               result = null;
//             });
//           return result;
//         },
//       ]),
//       ignoreExpiration: false,
//       secretOrKey: configureService.get<string>('REFRESH_TOKEN_SECRET'),
//       passReqToCallback: true,
//     });
//   }

//   async validate(payload: any) {
//     console.log('JWT', payload);
//     //refreshtoken db 에서 조회, refresh token 있는지, 있으면 까서 페이로드 전달.
//     const user = await this.authService.validateUser(payload);
//     return user;
//   }
// }
