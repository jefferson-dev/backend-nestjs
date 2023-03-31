import { SetMetadata } from '@nestjs/common';

export const UseRole = (role: string): MethodDecorator => SetMetadata('role', role);
