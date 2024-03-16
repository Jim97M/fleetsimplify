import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

import { User } from '../models/user.class';
import { AuthService } from '../services/auth.services';


@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @ApiResponse({ status: 201, description: 'User Registered Successfully.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  @ApiBody({
     type: User,
     description: 'Json structure for user object',
  })
  register(@Body() user: User): Observable<User> {
    return this.authService.registerAccount(user);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() user: User): Observable<{ token: string }> {
    return this.authService
      .login(user)
      .pipe(map((jwt: string) => ({ token: jwt })));
  }
}
