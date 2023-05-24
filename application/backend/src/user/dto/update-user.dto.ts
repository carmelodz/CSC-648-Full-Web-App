import {
  IsEmail, IsNotEmpty, IsOptional,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
    @ApiPropertyOptional({
      description: 'The email of the user',
      format: 'email',
      example: 'john@example.com',
    })
      @IsEmail()
      @IsNotEmpty()
      @IsOptional()
      email?: string;

      @ApiPropertyOptional({
        description: 'The password of the user',
        minLength: 6,
        example: 'myPassword123',
      })
      @IsNotEmpty()
      @IsOptional()
        password?: string;

      @ApiPropertyOptional({
        description: 'Whether the user wants to receive COVID alerts',
        example: true,
      })
      @IsOptional()
        covid_alerts?: boolean;

      @ApiPropertyOptional({
        description: 'Whether the user wants to receive fire alerts',
        example: true,
      })
      @IsOptional()
        fire_alerts?: boolean;

      @ApiPropertyOptional({
        description: 'Whether the user wants to receive security alerts',
        example: true,
      })
      @IsOptional()
        security_alerts?: boolean;

      @ApiPropertyOptional({
        description: 'Whether the user wants to receive weather alerts',
        example: true,
      })
      @IsOptional()
        weather_alerts?: boolean;
}