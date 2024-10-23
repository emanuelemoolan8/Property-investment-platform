import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { OrderRepository } from './repository/order.repository';
import { PropertyRepository } from '../property/repository/property.repository';
import { OrderService } from './service/order.service';
import { OrderController } from './api/order.controller';

@Module({
  controllers: [OrderController],
  providers: [PrismaService, OrderService, OrderRepository, PropertyRepository],
  exports: [OrderService, OrderRepository],
})
export class OrderModule {}
