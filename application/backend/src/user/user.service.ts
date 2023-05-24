import { Injectable } from '@nestjs/common';
import { Alert, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateDirectorDto } from './dto/create-director.dto';
import { UpdateSettingsDto } from './dto/update-user-settings.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  findAllDirectors() {
    return this.prisma.user.findMany({
      where: {
        role: 'DIRECTOR_COUNTY',
      },
    });
  }

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const { countyName } = createUserDto;
    const alertTypeToFieldMap = {
      FIRE: 'fire_alerts',
      WEATHER: 'weather_alerts',
      HEALTH: 'health_alerts',
      SECURITY: 'security_alerts',
    };
    // Get all alerts for the county and filter out any that the user has already connected to
    const previousAlerts = await this.prisma.alert.findMany(
      { where: { countyName } },
    ).then((alerts) => alerts.filter((alert) => {
      const alertField = alertTypeToFieldMap[alert.type];
      return alertField && createUserDto[alertField];
    }));
    const data = {
      ...createUserDto,
      alerts: {
        connect: await Promise.all(previousAlerts.map((alert) => ({ id: alert.id }))),
      },
    };
    const user = await this.prisma.user.create({
      data: { ...data, password: hashedPassword },
    });
    await Promise.all(
      previousAlerts.map((alert) => this.prisma.alert.update({
        where: { id: alert.id },
        data: { users: { connect: { id: user.id } } },
        include: { users: true },
      })),
    );
    return user;
  }

  async createDirector(createDirectorDto: CreateDirectorDto) {
    const hashedPassword = await bcrypt.hash(createDirectorDto.password, 10);
    return this.prisma.user.create({
      data: {
        ...createDirectorDto,
        directorStatus: 'PENDING',
        role: 'DIRECTOR_COUNTY',
        password: hashedPassword,
      },
    });
  }

  findAll() {
    return this.prisma.user.findMany({
      where: {
        NOT: {
          role: 'DIRECTOR_COUNTY',
        },
      },
      include: { alerts: true },
    });
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,

    });
  }

  remove(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }

  async findRecentAlertsForUser(id: string): Promise<Alert[]> {
    const twentyFourHoursAgo = new Date();
    twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        alerts: {
          where: {
            createdAt: {
              gte: twentyFourHoursAgo,
            },
            alertStatus: 'APPROVED',
          },
        },
      },
    });
    return user.alerts;
  }

  async updateUserSettings(id: string, settings: UpdateSettingsDto): Promise<User> {
    const { countyName } = settings;
    const user = await this.prisma.user.findUnique({ where: { id }, include: { alerts: true } });

    const alertTypeToFieldMap = {
      FIRE: 'fire_alerts',
      WEATHER: 'weather_alerts',
      HEALTH: 'health_alerts',
      SECURITY: 'security_alerts',
    };
    // Get all alerts for the county and filter out any that the user has already connected to
    const countyAlerts = await this.prisma.alert.findMany(
      { where: { countyName } },
    ).then((alerts) => alerts.filter((alert) => {
      const alertField = alertTypeToFieldMap[alert.type];
      return alertField && settings[alertField]
      && !user.alerts.some((userAlert) => userAlert.id === alert.id);
    }));

    // Connect the new alerts to the user
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        ...settings,
        alerts: { connect: countyAlerts.map((alert) => ({ id: alert.id })) },
      },
    });
    return updatedUser;
  }
}
