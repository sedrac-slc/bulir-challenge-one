import { Injectable } from '@nestjs/common';
import { RegisterDto } from './register.dto';
import { CustomerService } from 'src/customer/customer.service';
import { ProviderService } from 'src/provider/provider.service';
import { JwtService } from '@nestjs/jwt';
import { CustomerDto } from 'src/customer/customer.dto';
import { ProviderDto } from 'src/provider/provider.dto';
import { UserType } from 'src/user/user.model';

@Injectable()
export class RegisterService {
  constructor(
    private readonly customerService: CustomerService,
    private readonly provideService: ProviderService,
    private readonly jwtService: JwtService,
  ) {}

  async register(req: RegisterDto) {
    let response, sub;
    if (req.userType == UserType.CUSTOMER) {
      const customer = await this.customerService.save(
        new CustomerDto(
          req.fullName,
          req.nif,
          req.email,
          req.password,
          req.balance,
        ),
      );
      response = customer.user.userResponse(req.balance);
      sub = customer.user.id;
    } else {
      const provider = await this.provideService.save(
        new ProviderDto(req.fullName, req.nif, req.email, req.password),
      );
      response = provider.user.userResponse();
      sub = provider.user.id;
    }

    const payload = { sub: sub, email: req.email, userType: req.userType };
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: response,
    };
  }
}
