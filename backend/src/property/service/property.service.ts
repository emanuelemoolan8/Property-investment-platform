import * as TE from 'fp-ts/TaskEither';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  CreatePropertyDtoType,
  UpdatePropertyDtoType,
} from 'src/middleware/validation/property-validation';
import { PropertyRepository } from '../repository/property.repository';

@Injectable()
export class PropertyService {
  private readonly staticImageUrls: string[];

  constructor(
    private readonly propertyRepo: PropertyRepository,
    private readonly configService: ConfigService,
  ) {
    const backendUrl =
      this.configService.get<string>('BACKEND_BASE_URL') ||
      'http://localhost:3000';

    this.staticImageUrls = [
      `${backendUrl}/public/images/property1.jpg`,
      `${backendUrl}/public/images/property2.jpg`,
      `${backendUrl}/public/images/property3.jpg`,
    ];
  }

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

  // Create a new property with a random image from staticImageUrls
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

  // Update a property by ID
  updatePropertyService(
    id: number,
    data: UpdatePropertyDtoType,
  ): TE.TaskEither<Error, any> {
    return TE.tryCatch(
      () => this.propertyRepo.updateProperty(id, data),
      () => new Error('Failed to update property'),
    );
  }

  // Delete a property by ID
  deletePropertyService(id: number): TE.TaskEither<Error, any> {
    return TE.tryCatch(
      () => this.propertyRepo.deleteProperty(id),
      () => new Error('Failed to delete property'),
    );
  }
}
