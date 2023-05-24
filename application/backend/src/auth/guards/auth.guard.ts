import {
  Injectable, CanActivate, ExecutionContext, HttpStatus, HttpException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from '@prisma/client';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private reflector: Reflector) { }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user: User = request.session?.user;
    if (!user) {
      return false;
    }

    /*
    ** This code retrieves the metadata set using the @Roles decorator
    ** on the endpoint handler function,
    ** and checks if there is any role defined for this endpoint.
    ** If there are no roles defined, the user is authorized to access the endpoint.
    ** If there are roles defined, the code checks if the user has any of these
    ** roles.
    ** If the user has at least one of the roles, then the user is authorized to
    ** access the endpoint, otherwise access is denied.
    */
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    if (roles.some((role) => user.role.includes(role))) {
      return true;
    }
    throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
  }
}
