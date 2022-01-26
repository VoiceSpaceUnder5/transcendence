import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';

@Injectable()
export class SiteAuthorityGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPassAccessGuard = this.reflector.get<boolean>(
      'isPassSiteAuthorityGuard',
      context.getHandler(),
    );
    if (isPassAccessGuard) {
      return true;
    }
    const req =
      context.getType() === 'http'
        ? context.switchToHttp().getRequest()
        : GqlExecutionContext.create(context).getContext().req;
    const authorityId = req.user.authorityId;
    if (authorityId === 'UA3') {
      throw new ForbiddenException();
    }
    return true;
  }
}

@Injectable()
export class SiteManagerGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req =
      context.getType() === 'http'
        ? context.switchToHttp().getRequest()
        : GqlExecutionContext.create(context).getContext().req;
    const authorityId = req.user.authorityId;
    if (authorityId !== 'UA0' && authorityId !== 'UA2') {
      throw new ForbiddenException();
    }
    return true;
  }
}

@Injectable()
export class SiteOwnerGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req =
      context.getType() === 'http'
        ? context.switchToHttp().getRequest()
        : GqlExecutionContext.create(context).getContext().req;
    const authorityId = req.user.authorityId;
    if (authorityId !== 'UA0') {
      throw new ForbiddenException();
    }
    return true;
  }
}
