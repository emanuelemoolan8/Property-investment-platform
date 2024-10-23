import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserRole } from 'src/types/req-user.interface';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  createUser(data: {
    email: string;
    name: string;
    password: string;
    balance: number;
    role?: UserRole;
  }) {
    return this.prisma.user.create({
      data,
    });
  }
  findUserByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  findUserById(userId: number) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      include: { orders: true },
    });
  }

  findAllUsers() {
    return this.prisma.user.findMany();
  }

  updateUserBalance(userId: number, balance: number) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { balance },
    });
  }
}
