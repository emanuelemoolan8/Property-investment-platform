import { Order } from './order.model';

export interface User {
  name: string;
  balance: number;
  email: string;
  role: string;
  updatedAt?: string;
  createdAt?: string;
  orders?: Order[];
}

export interface AddBalanceResponse {
  success: boolean;
  message?: string;
}
