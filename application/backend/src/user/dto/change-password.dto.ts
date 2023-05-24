import {
  IsNotEmpty, IsOptional,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class ChangePasswordDto {
      @ApiPropertyOptional({
        description: 'The password of the user',
        minLength: 6,
        example: 'myPassword123',
      })
      @IsNotEmpty()
      @IsOptional()
        currentPassword?: string;

      @ApiPropertyOptional({
        description: 'The new password of the user',
        minLength: 6,
        example: 'myNewPassword123',
      })
      @IsNotEmpty()
      @IsOptional()
        newPassword?: string;

      @ApiPropertyOptional({
        description: 'The new password of the user',
        minLength: 6,
        example: 'myNewPassword123',
      })
      @IsNotEmpty()
      @IsOptional()
        confirmNewPassword?: string;
}
