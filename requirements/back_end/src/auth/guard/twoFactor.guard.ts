import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { User } from 'src/users/user.entity';
import { AuthService } from '../auth.service';

@Injectable()
export class TwoFactorGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // 1️⃣ PassTwoFactor 데코레이터가 활성화된 라우터에서는 가드 처리를 하지 않는다.
    if (context.getType() === 'http') {
      const isPassTwoFactorGuard = this.reflector.get<boolean>(
        'isPassTwoFactorGuard',
        context.getHandler(),
      );
      if (isPassTwoFactorGuard) {
        return true;
      }
      //2️⃣ 컨텍스트가 http 면 바로 처리해서 리턴
      const user = context.getArgs()[0].user;
      const cookie = context
        .switchToHttp()
        .getRequest()
        .headers.cookie.split('; 	');
      console.log(cookie);
      if (!user.twoFactorAuth) return true;
      return true;
    }

    //3️⃣ 컨택스트가 gqlContext이면 http 컨텍스트로 변환해서 처리.
    const gqlContext = GqlExecutionContext.create(context);
    const { req } = gqlContext.getContext();
    return true;
  }
  // private validateTwoFactor(token: string) {
  //   this.authService.validateUser();
  // }
}
