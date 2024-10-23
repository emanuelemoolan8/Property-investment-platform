import * as t from 'io-ts';

export const CreateOrderDto = t.type({
  propertyId: t.number,
  pieces: t.number,
  userId: t.number,
  amount: t.union([t.number, t.undefined]),
});

export type CreateOrderDtoType = t.TypeOf<typeof CreateOrderDto>;

export const UpdateOrderDto = t.partial({
  propertyId: t.number,
  pieces: t.number,
});
export type UpdateOrderDtoType = t.TypeOf<typeof UpdateOrderDto>;
