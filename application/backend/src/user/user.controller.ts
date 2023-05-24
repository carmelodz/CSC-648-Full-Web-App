import {
  Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Session,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Roles } from 'src/auth/guards/roles.decorator';
import {
  ApiOperation, ApiTags,
} from '@nestjs/swagger';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateSettingsDto } from './dto/update-user-settings.dto';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Roles('ADMIN')
  @ApiOperation({
    summary: 'ADMIN Protected route',
  })
  @Get('admin')
  adminRoute() {
    return 'Hello World!';
  }

  @Get('directors')
  findAllDirectors() {
    return this.userService.findAllDirectors();
  }

  @UseGuards(AuthGuard)
    @ApiOperation({
      summary: 'Authentication Required',
    })
  @Get('/notifications')
  async getNotifications(@Session() session) {
    const { id } = session.user;
    const notifications = await this.userService.findRecentAlertsForUser(id);
    return notifications;
  }

  @UseGuards(AuthGuard)
    @ApiOperation({
      summary: 'Authentication Required',
    })
  @Patch('settings')
  async updateSettings(@Session() session, @Body() settings: UpdateSettingsDto) {
    const { id } = session.user;
    session.user = await this.userService.updateUserSettings(id, settings); // eslint-disable-line
    return session.user;
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
