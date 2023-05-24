import { SetMetadata } from '@nestjs/common';

/*
** This code exports a function called Roles, which takes in a variable number of string arguments
** (...roles: string[]).
** The function itself creates metadata for the roles key using the SetMetadata function provided
** by NestJS, and returns the result of this call.
**
** The metadata can be retrieved later using the Reflector class provided by NestJS,
** and can be used to enforce role-based authorization using a custom RoleGuard.
*/

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
