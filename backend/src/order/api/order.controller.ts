import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpException,
  HttpStatus,
  UseGuards,
  Request,
} from '@nestjs/common';
import { pipe } from 'fp-ts/function';
import * as E from 'fp-ts/Either';
import * as TE from 'fp-ts/TaskEither';
import { OrderService } from '../service/order.service';
import {
  CreateOrderDto,
  CreateOrderDtoType,
  UpdateOrderDto,
  UpdateOrderDtoType,
} from 'src/middleware/validation/order-validation';
import { AuthGuard } from '@nestjs/passport';

@Controller('v1/orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createOrder(@Body() body: CreateOrderDtoType, @Request() req) {
    const userId = req.user.id;
    const orderData = { ...body, userId };
    console.log(orderData);
    const validation = CreateOrderDto.decode(orderData);

    return pipe(
      validation,
      E.match(
        (errors) => {
          throw new HttpException('Validation failed', HttpStatus.BAD_REQUEST);
        },
        async (validOrder) => {
          const result = await pipe(
            this.orderService.createOrder(validOrder),
            TE.match(
              (error) => {
                throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
              },
              (order) => order,
            ),
          )();
          return result;
        },
      ),
    );
  }

  @Get(':id')
  async getOrderById(@Param('id') id: number) {
    const result = await pipe(
      this.orderService.getOrderById(Number(id)),
      TE.match(
        (error) => {
          throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        },
        (order) => order,
      ),
    )();
    return result;
  }

  @Get()
  async getAllOrders() {
    const result = await pipe(
      this.orderService.getAllOrders(),
      TE.match(
        (error) => {
          throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        },
        (orders) => orders,
      ),
    )();
    return result;
  }

  @Put(':id')
  async updateOrder(@Param('id') id: number, @Body() body: UpdateOrderDtoType) {
    const validation = UpdateOrderDto.decode(body);

    return pipe(
      validation,
      E.match(
        (errors) => {
          throw new HttpException('Validation failed', HttpStatus.BAD_REQUEST);
        },
        async (validOrder) => {
          const result = await pipe(
            this.orderService.updateOrder(Number(id), validOrder),
            TE.match(
              (error) => {
                throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
              },
              (updatedOrder) => updatedOrder,
            ),
          )();
          return result;
        },
      ),
    );
  }

  @Delete(':id')
  async deleteOrder(@Param('id') id: number) {
    const result = await pipe(
      this.orderService.deleteOrder(Number(id)),
      TE.match(
        (error) => {
          throw new HttpException(error.message, HttpStatus.NOT_FOUND);
        },
        () => ({ message: 'Order deleted successfully' }),
      ),
    )();
    return result;
  }
}
