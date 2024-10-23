import {
  Controller,
  Post,
  Body,
  Get,
  Req,
  HttpException,
  HttpStatus,
  UseGuards,
  Param,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { RequestWithUser, UserRole } from 'src/types/req-user.interface';

@Controller('v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(
    @Body()
    data: {
      email: string;
      name: string;
      password: string;
      role?: UserRole;
    },
  ) {
    try {
      return await this.usersService.createUser(data);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  async getUserDetails(@Req() req: RequestWithUser) {
    const userId = req.user.id;

    if (!userId) {
      throw new HttpException('User ID not found', HttpStatus.UNAUTHORIZED);
    }

    const user = await this.usersService.findUserById(Number(userId));
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  @Get()
  async getAllUsers() {
    const users = await this.usersService.getAllUsers();
    return users;
  }

  @Post('add-balance')
  @UseGuards(AuthGuard('jwt'))
  async addBalance(
    @Body() data: { amount: number },
    @Req() req: RequestWithUser,
  ) {
    const userId = req.user.id;
    if (!userId) {
      throw new HttpException('User ID not found', HttpStatus.UNAUTHORIZED);
    }
    try {
      return await this.usersService.addBalance(
        Number(userId),
        Number(data.amount),
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
