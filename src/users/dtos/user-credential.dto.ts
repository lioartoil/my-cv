import { IsEmail, IsString } from 'class-validator';

export class UserCredentialDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
