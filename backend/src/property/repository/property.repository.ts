import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  CreatePropertyDtoType,
  UpdatePropertyDtoType,
} from 'src/middleware/validation/property-validation';

@Injectable()
export class PropertyRepository {
  constructor(private readonly prisma: PrismaService) {}

  findPropertyById(id: number) {
    return this.prisma.property.findUnique({ where: { id } });
  }

  findAllProperties() {
    return this.prisma.property.findMany();
  }

  createProperty(data: CreatePropertyDtoType) {
    return this.prisma.property.create({ data });
  }

  updateProperty(id: number, data: UpdatePropertyDtoType) {
    return this.prisma.property.update({
      where: { id },
      data,
    });
  }

  deleteProperty(id: number) {
    return this.prisma.property.delete({ where: { id } });
  }
}
