import {
  CanActivate,
  ExecutionContext,
  Injectable,
  mixin,
} from '@nestjs/common';
import { Role } from '../roles/roles.enum';

export const RoleGuard = (requireRoles: Role[]) => {
  class RoleGuard implements CanActivate {
    matchRoles(roles: Role[], userRole: string) {
      return roles.some((role) => role === userRole);
    }

    canActivate(context: ExecutionContext): boolean {
      if (!requireRoles) {
        return true;
      }
      const request = context.switchToHttp().getRequest();
      const user = request.user;
      return requireRoles.some((role) => user.roles.includes(role));
    }
  }

  return mixin(RoleGuard);
};

// @Injectable()

// }
