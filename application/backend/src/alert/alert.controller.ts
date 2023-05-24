import {
  Controller, Get, Post, Body, Patch, Param, Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Alert } from '@prisma/client';
import { AlertService } from './alert.service';
import { CreateAlertDto } from './dto/create-alert.dto';
import { UpdateAlertDto } from './dto/update-alert.dto';
import { SearchAlertsDto } from './dto/search-alert.dto';

@Controller('alert')
@ApiTags('alert')
export class AlertController {
  constructor(private readonly alertService: AlertService) {}

  @Get('approved')
  findAllApproved() {
    return this.alertService.findAllApproved();
  }

  @Post('search')
  async searchAlerts(@Body() searchAlertsDto: SearchAlertsDto): Promise<Alert[]> {
    const {
      types, contentSearch, countySearch, zipCode,
    } = searchAlertsDto;
    return this.alertService.searchAlerts(types, contentSearch, countySearch, zipCode);
  }

  @Post()
  create(@Body() createAlertDto: CreateAlertDto) {
    return this.alertService.create(createAlertDto);
  }

  @Get()
  findAll() {
    return this.alertService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.alertService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateAlertDto: UpdateAlertDto) {
    return this.alertService.update(id, updateAlertDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.alertService.remove(id);
  }
}
