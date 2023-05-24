import { Controller, Get, HttpCode } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  @Get('health')
  @HttpCode(200)
  @ApiOkResponse({ description: 'Healthcheck: API is up and running.' })
  healthCheck(): string {
    return 'API is up and running!';
  }
}
