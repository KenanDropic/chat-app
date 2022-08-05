import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import LoginUserDto from './login-user.dto';

export default class RegisterUserDto extends LoginUserDto {
  @IsString()
  @MaxLength(12)
  @MinLength(3)
  username: string;
}
