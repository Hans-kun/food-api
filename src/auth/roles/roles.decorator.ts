import { SetMetadata } from '@nestjs/common';
import { Role } from '../roles/roles.enum';

export const Roles = (...args: Role[]) => SetMetadata('roles', args);
