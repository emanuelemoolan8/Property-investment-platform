import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient, Prisma } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({
      log: ['query', 'info', 'warn', 'error'],
    });
  }

  async onModuleInit() {
    await this.$connect();

    // @ts-ignore
    this.$on('query', (e: Prisma.QueryEvent) => {
      console.log(`Query: ${e.query}`);
      console.log(`Params: ${e.params}`);
      console.log(`Duration: ${e.duration}ms`);
    });

    // @ts-ignore
    this.$on('warn', (e: Prisma.LogEvent) => {
      console.warn(`Warning: ${e.message}`);
    });

    // @ts-ignore
    this.$on('info', (e: Prisma.LogEvent) => {
      console.info(`Info: ${e.message}`);
    });

    // @ts-ignore
    this.$on('error', (e: Prisma.LogEvent) => {
      console.error(`Error: ${e.message}`);
    });
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
