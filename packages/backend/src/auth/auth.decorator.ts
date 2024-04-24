import {createParamDecorator, ExecutionContext} from '@nestjs/common';
import {GqlExecutionContext} from '@nestjs/graphql';

export const UserId = createParamDecorator((data: unknown, context: ExecutionContext) => {
  const ctx = GqlExecutionContext.create(context);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return ctx.getContext().req.userId;
});
