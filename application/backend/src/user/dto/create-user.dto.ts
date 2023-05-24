import {
  IsEmail, IsNotEmpty, IsString, MinLength, IsBoolean,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { County } from '@prisma/client';

export class CreateUserDto {
    @ApiProperty({
      description: 'The email of the user',
      format: 'email',
      example: 'john@example.com',
    })
    @IsEmail()
    @IsNotEmpty()
      email: string;

    @ApiProperty({
      description: 'The password of the user',
      minLength: 6,
      example: 'myPassword123',
    })
    @IsString()
    @MinLength(6)
    @IsNotEmpty()
      password: string;

    @ApiProperty({ description: 'Received Covid alerts' })
    @IsBoolean()
      health_alerts? = true;

    @ApiProperty({ description: 'Receive Fire alerts' })
    @IsBoolean()
      fire_alerts? = true;

    @ApiProperty({ description: 'Receive Security alerts' })
    @IsBoolean()
      security_alerts? = true;

    @ApiProperty({ description: 'Receive Weather alerts' })
    @IsBoolean()
      weather_alerts? = true;

    @ApiProperty({ description: 'County you live in', example: 'Fresno' })
    @IsString()
    @IsNotEmpty()
      countyName: County;
}
