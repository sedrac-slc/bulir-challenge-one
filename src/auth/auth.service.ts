import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CustomerService } from 'src/customer/customer.service';
import { UserType } from 'src/user/user.model';
import { UserResponse } from 'src/response/UserResponse';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly customerService: CustomerService,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(
    email: string,
    pass: string,
  ): Promise<{ access_token: string; user: any }> {
    const user = await this.userService.findByEmail(email);

    if (!user.password || !compareSync(pass, user.password)) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, email: user.email, userType: user.type };

    let person: UserResponse;

    if (user.type === UserType.CUSTOMER) {
      const customer = await this.customerService.findByUser(user.id);
      person = user.userResponse(customer.balance);
    } else {
      person = user.userResponse();
    }

    return {
      access_token: await this.jwtService.signAsync(payload),
      user: person,
    };
  }

  async verifyToken(token: string) {
    try {
      await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_TOKEN'),
      });
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
}
