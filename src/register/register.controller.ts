import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { Public } from 'src/decorators/public.decorator';
import { RegisterDto } from './register.dto';
import { RegisterService } from './register.service';

@Controller('register')
export class RegisterController {
  constructor(private registerService: RegisterService) {}

  @Post()
  @Public()
  @HttpCode(HttpStatus.OK)
  createAccount(@Body() req: RegisterDto) {
    return this.registerService.register(req);
  }
}
