import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { OrderModule } from './order/order.module';
import { PropertyModule } from './property/property.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UsersModule } from './user/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    OrderModule,
    PropertyModule,
    AuthModule,
    UsersModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/public',
    }),
  ],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
