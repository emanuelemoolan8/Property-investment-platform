import * as TE from 'fp-ts/TaskEither';
import { Injectable } from '@nestjs/common';
import { pipe } from 'fp-ts/function';
import { OrderRepository } from '../repository/order.repository';
import { PropertyRepository } from 'src/property/repository/property.repository';
import {
  CreateOrderDtoType,
  UpdateOrderDtoType,
} from 'src/middleware/validation/order-validation';
import { Property, Order, User } from '@prisma/client';
import { PropertyStatus } from '@prisma/client';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly propertyRepository: PropertyRepository,
  ) {}

  createOrder(order: CreateOrderDtoType): TE.TaskEither<Error, Order> {
    return pipe(
      this.findProperty(order.propertyId),
      TE.chain((property) =>
        this.verifyPropertyAvailability(property, order.pieces),
      ),
      TE.chain((property) => this.findUser(order.userId, property, order)),
      TE.chain(({ property, user }) =>
        this.updateUserBalance(user, property, order),
      ),
      TE.chain((property) =>
        this.updatePropertyAvailability(property, order.pieces),
      ),
      TE.chain((property) => this.createOrderRecord(order, property)),
    );
  }

  private findProperty(propertyId: number): TE.TaskEither<Error, Property> {
    return TE.tryCatch(
      () => this.propertyRepository.findPropertyById(propertyId),
      () => new Error('Property not found'),
    );
  }

  private verifyPropertyAvailability(
    property: Property,
    pieces: number,
  ): TE.TaskEither<Error, Property> {
    if (!property) {
      return TE.left(new Error('Property not found'));
    }
    if (property.availablePieces < pieces) {
      return TE.left(new Error('Not enough available pieces'));
    }
    return TE.right(property);
  }

  private findUser(
    userId: number,
    property: Property,
    order: CreateOrderDtoType,
  ): TE.TaskEither<Error, { property: Property; user: User }> {
    return pipe(
      TE.tryCatch(
        () => this.orderRepository.findUserById(userId),
        () => new Error('User not found'),
      ),
      TE.chain((user) => {
        if (!user) {
          return TE.left(new Error('User not found'));
        }

        const totalPrice = property.unitPrice * order.pieces;
        if (user.balance < totalPrice) {
          return TE.left(new Error('Not enough balance in user account'));
        }

        return TE.right({ property, user });
      }),
    );
  }

  private updateUserBalance(
    user: User,
    property: Property,
    order: CreateOrderDtoType,
  ): TE.TaskEither<Error, Property> {
    const updatedUserBalance = user.balance - property.unitPrice * order.pieces;
    return pipe(
      TE.tryCatch(
        () =>
          this.orderRepository.updateUserBalance(
            order.userId,
            updatedUserBalance,
          ),
        () => new Error('Failed to update user balance'),
      ),
      TE.map(() => property),
    );
  }

  private updatePropertyAvailability(
    property: Property,
    pieces: number,
  ): TE.TaskEither<Error, Property> {
    const updatedProperty: Property = {
      ...property,
      availablePieces: property.availablePieces - pieces,
      soldPieces: property.soldPieces + pieces,
      status:
        property.availablePieces - pieces > 0
          ? PropertyStatus.available
          : PropertyStatus.not_available,
    };

    return TE.tryCatch(
      () =>
        this.propertyRepository.updateProperty(property.id, updatedProperty),
      () => new Error('Failed to update property'),
    );
  }

  private createOrderRecord(
    order: CreateOrderDtoType,
    property: Property,
  ): TE.TaskEither<Error, any> {
    const amount = property.unitPrice * order.pieces;
    const orderData = { ...order, amount };
    return TE.tryCatch(
      () => this.orderRepository.createOrder(orderData),
      () => new Error('Failed to create order'),
    );
  }

  getOrderById(id: number): TE.TaskEither<Error, Order | null> {
    return TE.tryCatch(
      () => this.orderRepository.findOrderById(id),
      () => new Error(`Order with ID ${id} not found`),
    );
  }

  getAllOrders(): TE.TaskEither<Error, Order[]> {
    return TE.tryCatch(
      () => this.orderRepository.findAllOrders(),
      () => new Error('Failed to fetch orders'),
    );
  }

  updateOrder(
    id: number,
    order: UpdateOrderDtoType,
  ): TE.TaskEither<Error, Order> {
    return pipe(
      TE.tryCatch(
        () => this.orderRepository.findOrderById(id),
        () => new Error(`Order with ID ${id} not found`),
      ),
      TE.chain((existingOrder: Order | null) => {
        if (!existingOrder) {
          return TE.left(new Error('Order not found'));
        }

        return TE.tryCatch(
          () => this.orderRepository.updateOrder(id, order),
          () => new Error('Failed to update order'),
        );
      }),
    );
  }

  deleteOrder(id: number): TE.TaskEither<Error, Order> {
    return pipe(
      TE.tryCatch(
        () => this.orderRepository.findOrderById(id),
        () => new Error(`Order with ID ${id} not found`),
      ),
      TE.chain((order: Order | null) => {
        if (!order) {
          return TE.left(new Error('Order not found'));
        }

        return TE.tryCatch(
          () => this.orderRepository.deleteOrder(id),
          () => new Error(`Failed to delete order with ID ${id}`),
        );
      }),
    );
  }
}
