import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {

  constructor(private userService: UsersService,
              private jwtService:JwtService) { }

  async register(registerDto: RegisterDto) {
    const user = await this.userService.findOneByEmail(registerDto.email);

    const pass_encryptada = await bcrypt.hash(registerDto.password, 10)

    if (user) {
      throw new BadRequestException(`El usuario ya existe`) //interrupe ejecucion
    } else {
      return await this.userService.create(new User(registerDto.email, pass_encryptada, registerDto.username))
    }
  }

  // async login (loginDto:LoginDto) {
  async login ({email,password}:LoginDto) {
    //consulto si el user esta en la base de datos
    const user = await this.userService.findOneByEmail(email);
    if(!user){
      throw new UnauthorizedException('usuario incorrecto');
    } else {
      //se usa la libreria de bcript para compararlas y arroja un booleano
      const isPasswordValid = await bcrypt.compare(password,user.password);

      if(!isPasswordValid){
        throw new UnauthorizedException('password incorrecto');
      }else{//si son iguales:
        //creacion del payload
        const payload = {email: user.email}
        //creo el token
        const token = await this.jwtService.signAsync(payload);
        return token
      }
    }
  }
}