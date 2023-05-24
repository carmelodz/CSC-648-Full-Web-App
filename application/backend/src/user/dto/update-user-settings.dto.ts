import { IsBoolean } from 'class-validator';
import { County } from '@prisma/client';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateSettingsDto {
    @ApiPropertyOptional({ description: 'Receive Covid alerts' })
        @IsBoolean()
      health_alerts?: boolean;

      @ApiPropertyOptional({ description: 'Receive Fire alerts' })
        @IsBoolean()
        fire_alerts?: boolean;

      @ApiPropertyOptional({ description: 'Receive Security alerts' })
        @IsBoolean()
        security_alerts?: boolean;

      @ApiPropertyOptional({ description: 'Receive Weather alerts' })
        @IsBoolean()
        weather_alerts?: boolean;

      @ApiPropertyOptional({ description: 'County you live in' })
        countyName?: County;
}
