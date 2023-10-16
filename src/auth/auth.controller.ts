import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './auth.guard';
import { Role } from 'src/common/enum/role.enum';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }


  @Post('register')
  register(@Body() registerDTO: RegisterDto) {
    return this.authService.register(registerDTO)
  }

  @Post('login')
  login(@Body() loginDTO: LoginDto) {
    return this.authService.login(loginDTO)
  }

  @Get('home')
  @UseGuards(AuthGuard)//adentro va el Guar que nosostros vamos a generar. Lo que hace es verificar ese token
  getHome(@Req() request) {
    //return `Entramos al Home`

    if (request.user.role !== Role.ADMIN) {
      return "no tienes suficiente permisos para acceder a mas informacion";
    } else {
      if (request.user.role === Role.ADMIN) {
        return request.user;
      } else {
        return "no se como llegaste hasta aqui!!!"
      }
    };
  }
}
