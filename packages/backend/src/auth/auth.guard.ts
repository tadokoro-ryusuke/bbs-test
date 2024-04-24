import {IncomingMessage} from 'http';

import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common';
import {GqlContextType, GqlExecutionContext} from '@nestjs/graphql';

import {FirebaseService} from '@/firebase/firebase.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly firebaseService: FirebaseService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (context.getType<GqlContextType>() !== 'graphql') {
      return true;
    }

    const request: IncomingMessage & {userId?: string} =
      GqlExecutionContext.create(context).getContext().req;

    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const decodedIdToken = await this.firebaseService.verifyToken(token);
      const userId = decodedIdToken.uid;

      request.userId = userId;
    } catch (e) {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: IncomingMessage): string | undefined {
    const [type, token] = request.headers?.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
