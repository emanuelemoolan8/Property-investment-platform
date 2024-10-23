export interface Property {
  id: string;
  city: string;
  address: string;
  totalPieces: number;
  availablePieces: number;
  soldPieces: number;
  unitPrice: number;
  status: 'available' | 'not_available' | 'hidden';
  imageUrl?: string;
}
