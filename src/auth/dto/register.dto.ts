import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";


export class RegisterDto{

  @IsString()//estas son verificaciones que debe cumplir la info al ingresar al DTO
  @IsNotEmpty()
  readonly username:string;

  @IsString()
  @IsEmail()
  readonly email:string;

  @IsString()
  @MinLength(6)
  readonly password:string;

}