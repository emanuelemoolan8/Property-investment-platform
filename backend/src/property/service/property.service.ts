import * as TE from 'fp-ts/TaskEither';
import { Injectable } from '@nestjs/common';
import {
  CreatePropertyDtoType,
  UpdatePropertyDtoType,
} from 'src/middleware/validation/property-validation';
import { PropertyRepository } from '../repository/property.repository';

@Injectable()
export class PropertyService {
  constructor(private readonly propertyRepo: PropertyRepository) {}

  private staticImageUrls = [
    'http://localhost:3000/public/images/property1.jpg',
    'http://localhost:3000/public/images/property2.jpg',
    'http://localhost:3000/public/images/property3.jpg',
  ];

  getPropertyService(id: number): TE.TaskEither<Error, any> {
    return TE.tryCatch(
      () => this.propertyRepo.findPropertyById(id),
      () => new Error('Property not found'),
    );
  }

  getAllPropertiesService(): TE.TaskEither<Error, any> {
    return TE.tryCatch(
      () => this.propertyRepo.findAllProperties(),
      () => new Error('Failed to fetch properties'),
    );
  }

  createPropertyService(
    data: CreatePropertyDtoType,
  ): TE.TaskEither<Error, any> {
    return TE.tryCatch(
      async () => {
        const randomImageUrl =
          this.staticImageUrls[
            Math.floor(Math.random() * this.staticImageUrls.length)
          ];

        const newPropertyData = {
          ...data,
          imageUrl: randomImageUrl,
        };

        return this.propertyRepo.createProperty(newPropertyData);
      },
      () => new Error('Failed to create property'),
    );
  }

  updatePropertyService(
    id: number,
    data: UpdatePropertyDtoType,
  ): TE.TaskEither<Error, any> {
    return TE.tryCatch(
      () => this.propertyRepo.updateProperty(id, data),
      () => new Error('Failed to update property'),
    );
  }

  deletePropertyService(id: number): TE.TaskEither<Error, any> {
    return TE.tryCatch(
      () => this.propertyRepo.deleteProperty(id),
      () => new Error('Failed to delete property'),
    );
  }
}
