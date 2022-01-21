import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AccessGuard extends AuthGuard('jwt-access') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    //1️⃣ handler를 통해 전달된 메타데이터를 확인해서 가드의 예외를 판단한다.

    //2️⃣ 컨텍스트가 http 면 바로 처리해서 리턴)
    if (context.getType() === 'http') {
      const isPassAccessGuard = this.reflector.get<boolean>(
        'isPassAccessGuard',
        context.getHandler(),
      );
      if (isPassAccessGuard) {
        return true;
      }
      return super.canActivate(context);
    }
    //3️⃣ 컨택스트가 gqlContext이면 http 컨텍스트로 변환해서 처리.
    const gqlContext = GqlExecutionContext.create(context);
    const { req } = gqlContext.getContext();
    return super.canActivate(new ExecutionContextHost([req]));
  }

  handleRequest(err: any, user: any) {
    if (err || !user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
