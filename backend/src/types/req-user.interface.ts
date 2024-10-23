import { Request } from '@nestjs/common';

export interface RequestWithUser extends Request {
  user: {
    id: number;
    email: string;
  };
}

export enum UserRole {
  INVESTOR = 'INVESTOR',
  PROPERTY_MANAGER = 'PROPERTY_MANAGER',
}
