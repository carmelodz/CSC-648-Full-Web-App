import {
  IsNotEmpty, IsString, IsNumber, Min, Max,
} from 'class-validator';
import { ApiProperty, ApiHideProperty } from '@nestjs/swagger';
import { AlertType, County, User } from '@prisma/client';

export class CreateAlertDto {
  @ApiProperty({ description: 'Latitude of the alert', example: 48.8566 })
  @IsNotEmpty()
  readonly lat: number;

  readonly id?: string;

  @ApiProperty({ description: 'Longitude of the alert', example: 2.3522 })
  @IsNotEmpty()
  readonly lng: number;

  @ApiProperty({
    description: 'Severity level of the alert',
    example: 3,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(10)
  readonly severity: number;

  @ApiProperty({
    description: 'Type of alert',
    enum: ['FIRE', 'WEATHER', 'HEALTH', 'SECURITY'],
    example: 'FIRE',
  })
  @IsNotEmpty()
  @IsString()
  readonly type: AlertType;

  @ApiProperty({ description: 'Title of the alert', example: 'Forest Fire' })
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @ApiProperty({
    description: 'Description of the alert',
    example: 'A large forest fire has broken out in the area.',
  })
  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @ApiProperty({
    description: 'Zip code (optional)',
    required: false,
    example: '94014',
  })
  @IsString()
  readonly zipCode?: string;

  @ApiProperty({ description: 'Name of the county of California without space', example: 'San Francisco' })
  @IsNotEmpty()
  @IsString()
  readonly countyName: County;

  @ApiHideProperty()
    users?: User[];
}
