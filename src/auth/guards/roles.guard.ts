import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../models/role.enum';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { RequestWithUser } from '../models/user.class';
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest() as RequestWithUser;

    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (requiredRoles.length === 0) {
      return true;
    }

    return requiredRoles.some((role) => req.user.role.includes(role));
  }
}