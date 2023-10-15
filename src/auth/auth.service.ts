import { BadRequestException, Injectable } from '@nestjs/common';
//import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {

  constructor(private userService: UsersService,
              /* private jwtService:JwtService */) { }

  async register(registerDto: RegisterDto) {
    const user = await this.userService.findOneByEmail(registerDto.email);

    const pass_encryptada = await bcrypt.hash(registerDto.password, 10)

    if (user) {
      throw new BadRequestException(`El usuario ya existe`) //interrupe ejecucion
    } else {
      return await this.userService.create(new User(registerDto.email, pass_encryptada, registerDto.username))
    }
  }

}