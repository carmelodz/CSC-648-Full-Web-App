import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
    @ApiProperty({
      description: 'The email of the user',
      format: 'email',
      example: 'john@example.com',
    })
    @IsNotEmpty()
    @IsEmail()
      email: string;

    @ApiProperty({
      description: 'The password of the user',
      minLength: 6,
      example: 'myPassword123',
    })
    @IsNotEmpty()
      password: string;
}
