import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
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
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: user.userResponse(),
    };
  }
}
