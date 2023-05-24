import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Alert } from '@prisma/client';
import { CreateAlertDto } from './dto/create-alert.dto';
import { UpdateAlertDto } from './dto/update-alert.dto';

@Injectable()
export class AlertService {
  constructor(private prisma: PrismaService) { }

  // eslint-disable-next-line max-len
  async searchAlerts(types: string[], contentSearch: string, countySearch: string[], zipCode: string): Promise<any> {
    const whereClause = {
      OR: undefined,
      type: undefined,
      countyName: undefined,
      zipCode: undefined,
    };

    if (types.length > 0) {
      whereClause.type = { in: types };
    }

    if (contentSearch) {
      whereClause.OR = [
        {
          title: {
            contains: contentSearch,
          },
        },
        {
          description: {
            contains: contentSearch,
          },
        },
      ];
    }

    if (countySearch.length > 0) {
      whereClause.countyName = { in: countySearch };
    }

    if (zipCode) {
      whereClause.zipCode = { equals: zipCode };
    }

    return this.prisma.alert.findMany({
      where: whereClause,
    });
  }

  findAllApproved() {
    return this.prisma.alert.findMany({
      where: {
        alertStatus: 'APPROVED',
      },
    });
  }

  // Grabs users that have alerts turned on and live in a county
  async returnAlertAndCountyUsers(data: CreateAlertDto | UpdateAlertDto) {
    const { countyName, type } = data;

    const alertTypeToFieldMap = {
      FIRE: 'fire_alerts',
      WEATHER: 'weather_alerts',
      HEALTH: 'health_alerts',
      SECURITY: 'security_alerts',
    };

    const alertField = alertTypeToFieldMap[type];
    if (!alertField) {
      throw new Error('Unexpected ERROR');
    }

    const users = await this.prisma.user.findMany({
      where: {
        countyName,
        [alertField]: true,
      },
      include: { alerts: true },
    });

    return users;
  }

  async create(data: CreateAlertDto): Promise<Alert> {
    const users = await this.returnAlertAndCountyUsers(data);
    // Subscribing users to alerts
    const newData = {
      ...data,
      users: {
        connect: await Promise.all(users.map((user) => ({ id: user.id }))),
      },
    };
    const alert = await this.prisma.alert.create({ data: newData });
    // Subscribing alerts to users
    await Promise.all(users.map((user) => this.prisma.user.update({
      where: { id: user.id },
      data: { alerts: { connect: { id: alert.id } } },
      include: { alerts: true },
    })));
    return alert;
  }

  findAll() {
    return this.prisma.alert.findMany({});
  }

  findOne(id: string) {
    return this.prisma.alert.findUnique({
      where: {
        id,
      },
    });
  }

  // If alert type or countyName is changed, notifications will be updated
  async update(id: string, updateAlertDto: UpdateAlertDto) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { users, ...updateData } = updateAlertDto;

    return this.prisma.alert.update({
      where: { id },
      data: updateData,
    });
  }

  remove(id: string) {
    return this.prisma.alert.delete({ where: { id } });
  }
}
