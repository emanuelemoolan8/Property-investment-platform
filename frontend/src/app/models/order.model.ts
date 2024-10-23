export interface Order {
  id?: number;
  propertyId: string;
  pieces: number;
  userId?: number;
  amount?: number;
  updatedAt?: string;
  createdAt?: string;
}
