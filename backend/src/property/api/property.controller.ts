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
} from '@nestjs/common';
import { pipe } from 'fp-ts/function';
import * as TE from 'fp-ts/TaskEither';
import { PropertyService } from '../service/property.service';
import {
  CreatePropertyDtoType,
  UpdatePropertyDtoType,
} from 'src/middleware/validation/property-validation';

@Controller('v1/properties')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Get(':id')
  async getProperty(@Param('id') id: number) {
    return pipe(
      this.propertyService.getPropertyService(Number(id)),
      TE.match(
        (error) => {
          throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        },
        (property) => property,
      ),
    )();
  }

  @Get()
  async getAllProperties() {
    return pipe(
      this.propertyService.getAllPropertiesService(),
      TE.match(
        (error) => {
          throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        },
        (properties) => properties,
      ),
    )();
  }

  @Post()
  async createProperty(@Body() body: CreatePropertyDtoType) {
    return pipe(
      this.propertyService.createPropertyService(body),
      TE.match(
        (error) => {
          throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        },
        (property) => property,
      ),
    )();
  }

  @Put(':id')
  async updateProperty(
    @Param('id') id: number,
    @Body() body: UpdatePropertyDtoType,
  ) {
    return pipe(
      this.propertyService.updatePropertyService(Number(id), body),
      TE.match(
        (error) => {
          throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        },
        (updatedProperty) => updatedProperty,
      ),
    )();
  }

  @Delete(':id')
  async deleteProperty(@Param('id') id: number) {
    return pipe(
      this.propertyService.deletePropertyService(Number(id)),
      TE.match(
        (error) => {
          throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        },
        () => ({ message: 'Property deleted successfully' }),
      ),
    )();
  }
}
