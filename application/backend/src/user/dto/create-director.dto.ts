import {
  IsBoolean,
  IsEmail, IsNotEmpty, IsString, MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AlertType, County } from '@prisma/client';

export class CreateDirectorDto {
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

  @ApiProperty({
    description: 'Type of department ',
    example: 'FIRE',
  })
  @IsString()
  @IsNotEmpty()
    directorAlert: AlertType;

  @ApiProperty({
    description: 'County ',
    example: 'Alameda',
  })
@IsString()
@IsNotEmpty()
    countyName: County;

@IsBoolean()
  covid_alerts = true;

@IsBoolean()
  fire_alerts = true;

@IsBoolean()
  security_alerts = true;

@IsBoolean()
  weather_alerts = true;
}
