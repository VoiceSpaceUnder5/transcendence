import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { RefreshTokenService } from 'src/refreshtoken/refreshtoken.service';

@Injectable()
export class JwtAccessGuard extends AuthGuard('jwt-access') {}

// @Injectable()
// export class JwtRefreshGuard extends AuthGuard('jwt-refresh') {}

// @Injectable()
// export class JwtRefreshGuard implements CanActivate {
//   constructor(
//     private readonly refreshTokenService: RefreshTokenService,
//     private readonly jwtService: JwtService,
//     private readonly configService: ConfigService,
//   ) {}

//   canActivate(
//     context: ExecutionContext,
//   ): boolean | Promise<boolean> | Observable<boolean> {
//     try {
//       const refreshTokenId = context.switchToHttp().getRequest()
//         .cookies.refreshTokenId;
//       const refresh = this.refreshTokenService
//         .findOne(refreshTokenId)
//         .then((refresh) =>
//           this.jwtService.verify(refresh.token, {
//             secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
//           }),
//         );
//     } catch (e) {
//       console.info('RefreshTokenId is not found');
//       return false;
//     }

//     return true;
//   }
// }
