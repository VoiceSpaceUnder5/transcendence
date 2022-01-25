import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { RefreshTokenService } from 'src/refreshtoken/refreshtoken.service';

@Injectable()
export class DuplicateLoginGuard implements CanActivate {
  constructor(private readonly refreshTokenService: RefreshTokenService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // http 냐 graphql 이냐에 따라서 req 처리
    const req =
      context.getType() === 'http'
        ? context.switchToHttp().getRequest()
        : GqlExecutionContext.create(context).getContext().req;
    const refreshTokenId = req.cookies?.refreshTokenId;
    const userId = req.user.id;
    const compareToken = this.refreshTokenService.findOneByUserId(userId);
    return compareToken.then((compareToken) => {
      if (compareToken.id === refreshTokenId) return true;
      else throw new UnauthorizedException();
    });
  }
}
