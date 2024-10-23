import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/user/users.service';

interface JwtPayload {
  sub: number;
  email: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'yourSecretKey',
    });
  }

  async validate(payload: JwtPayload) {
    console.log('JWT Payload:', payload); // Log the entire payload
    const user = await this.usersService.findUserById(Number(payload.sub));
    if (!user) {
      throw new UnauthorizedException();
    }
    return { id: payload.sub, email: payload.email };
  }
}
