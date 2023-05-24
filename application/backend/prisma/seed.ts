import {
  AlertType, County, PrismaClient, RequestStatus, UserRole
} from '@prisma/client';
import * as bcrypt from 'bcrypt';
// eslint-disable-next-line import/no-extraneous-dependencies
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

async function main() {
  const hashPassword = async (plainPassword: string) => bcrypt.hash(plainPassword, 10);
  const directors = [
    {
      id: uuidv4(),
      email: 'director_sanfrancisco@example.com',
      password: await hashPassword('password'),
      role: UserRole.DIRECTOR_COUNTY,
      directorStatus: RequestStatus.APPROVED,
      directorAlert: AlertType.FIRE,
      countyName: County.SanFrancisco,
      health_alerts: true,
      fire_alerts: true,
      weather_alerts: false,
      security_alerts: false,
    },
    {
      id: uuidv4(),
      email: 'director_sanfrancisco2@example.com',
      password: await hashPassword('password'),
      role: UserRole.DIRECTOR_COUNTY,
      directorStatus: RequestStatus.PENDING,
      directorAlert: AlertType.HEALTH,
      countyName: County.SanFrancisco,
      health_alerts: false,
      fire_alerts: false,
      weather_alerts: true,
      security_alerts: false,
    },
    {
      id: uuidv4(),
      email: 'director_sonoma@example.com',
      password: await hashPassword('password'),
      role: UserRole.DIRECTOR_COUNTY,
      directorStatus: RequestStatus.PENDING,
      directorAlert: AlertType.HEALTH,
      countyName: County.Sonoma,
      health_alerts: false,
      fire_alerts: true,
      weather_alerts: true,
      security_alerts: false,
    },
    {
      id: uuidv4(),
      email: 'admin@gmail.com',
      password: await hashPassword('password'),
      role: UserRole.ADMIN,

      countyName: County.Sonoma,
      security_alerts: false,
      fire_alerts: true,
      weather_alerts: true,
      health_alerts: false,
    },
  ];

  const users = [
    {
      id: uuidv4(),
      email: 'user@example.com',
      password: await hashPassword('user_password'),
      role: UserRole.USER,
      countyName: County.Alameda,
      health_alerts: false,
      fire_alerts: true,
      weather_alerts: true,
      security_alerts: false,
    },
    {
      id: uuidv4(),
      email: 'admin@example.com',
      password: await hashPassword('admin_password'),
      role: UserRole.ADMIN,
      countyName: County.SanFrancisco,
      health_alerts: true,
      fire_alerts: true,
      weather_alerts: true,
      security_alerts: false,
    },
  ];

  await prisma.user.createMany({
    data: users,
  });

  await prisma.user.createMany({
    data: directors,
  });

  const alerts = [
    {
      id: uuidv4(),
      lat: 37.7749,
      lng: -122.4194,
      severity: 2,
      type: AlertType.FIRE,
      title: 'San Francisco Fire',
      description: 'A small fire has broken out in San Francisco.',
      zipCode: '94117',
      countyName: County.SanFrancisco,
    },
    {
      id: uuidv4(),
      lat: 34.0522,
      lng: -118.2437,
      severity: 3,
      type: AlertType.WEATHER,
      title: 'San Francisco Storm',
      description: 'A storm is approaching San Francisco.',
      zipCode: '90001',
      countyName: County.SanFrancisco,
    },
    {
      id: uuidv4(),
      lat: 34.0522,
      lng: -118.2437,
      severity: 3,
      type: AlertType.FIRE,
      title: 'Alarming Fire',
      description: 'Building is on Fire',
      zipCode: '90001',
      countyName: County.SanFrancisco,
    },
    {
      id: uuidv4(),
      lat: 36.7783,
      lng: -119.4179,
      severity: 1,
      type: AlertType.HEALTH,
      title: 'Fresno Health Advisory',
      description: 'Air quality warning for Fresno County.',
      zipCode: '93727',
      countyName: County.Fresno,
    },
  ];

  await prisma.alert.createMany({
    data: alerts,
  });

  console.log('DB Seed:');
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
