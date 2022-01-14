import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentUser = createParamDecorator((data, req) => {
  console.log('Step3', req.user);
  return req.user;
});

export const GetUser = createParamDecorator(
  (data, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context).getContext();
    const { user } = ctx.req;
    console.log('Step3', user);
    return user;
  },
);
