import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';

@Injectable()
export class channelRoleGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const gqlContext = GqlExecutionContext.create(context);
    console.log('롤가드 컨텍스트: ', gqlContext.getArgs());

    return true;
  }
}

// export class GqlJwtAccessGuard extends AuthGuard('jwt-access') {
//   canActivate(
//     context: ExecutionContext,
//   ): boolean | Promise<boolean> | Observable<boolean> {
//     const gqlContext = GqlExecutionContext.create(context);
//     const { req } = gqlContext.getContext();

//     return super.canActivate(new ExecutionContextHost([req]));
//   }

//   handleRequest(err: any, user: any) {
//     if (err || !user) {
//       throw err || new AuthenticationError('GqlAuthGuard');
//     }
//     console.log('Step2', user);
//     return user;
//   }
// }
