import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthDto } from './auth.dto';
import { Public } from 'src/decorators/public.decorator';

@ApiTags('Autenticação')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  @Public()
  @HttpCode(HttpStatus.OK)
  signIn(@Body() req: AuthDto) {
    return this.authService.signIn(req.email, req.password);
  }
}
