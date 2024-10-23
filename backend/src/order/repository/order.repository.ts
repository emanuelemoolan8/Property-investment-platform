import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreateOrderDtoType,
  UpdateOrderDtoType,
} from 'src/middleware/validation/order-validation';

@Injectable()
export class OrderRepository {
  constructor(private readonly prisma: PrismaService) {}

  findOrderById(id: number) {
    console.log(`Finding order with ID: ${id}`);
    return this.prisma.order.findUnique({ where: { id } });
  }

  findAllOrders() {
    return this.prisma.order.findMany();
  }

  createOrder(data: CreateOrderDtoType) {
    return this.prisma.order.create({ data });
  }

  updateOrder(id: number, data: UpdateOrderDtoType) {
    return this.prisma.order.update({
      where: { id },
      data,
    });
  }

  deleteOrder(id: number) {
    return this.prisma.order.delete({ where: { id } });
  }

  findUserById(userId: number) {
    return this.prisma.user.findUnique({
      where: { id: userId },
    });
  }

  updateUserBalance(userId: number, newBalance: number) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { balance: newBalance },
    });
  }
}
