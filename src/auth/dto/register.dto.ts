import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";


export class RegisterDto{

  @IsString()//condiciones que debe cumplir el DTO
  @IsNotEmpty()
  readonly username:string;

  @IsString()
  @IsEmail()
  readonly email:string;

  @IsString()
  @MinLength(6)
  readonly password:string;

}