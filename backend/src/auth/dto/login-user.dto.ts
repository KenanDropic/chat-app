import { IsEmail, IsString, Matches } from 'class-validator';

export default class LoginUserDto {
  @IsEmail()
  email: string;

  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/, {
    message:
      'Password must contain at least 6 characters,including one uppercase and lowercase letter,special character and number',
  })
  @IsString()
  password: string;
}
