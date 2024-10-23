import { Module } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { PropertyService } from './service/property.service';
import { PropertyRepository } from './repository/property.repository';
import { PropertyController } from './api/property.controller';

@Module({
  controllers: [PropertyController],
  providers: [PrismaService, PropertyService, PropertyRepository],
  exports: [PropertyService, PropertyRepository],
})
export class PropertyModule {}
