// prisma/seed_old.ts

import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }
// initialize Prisma Client
const prisma = new PrismaClient();

// ('1', 'user1@example.com', 'password1', '1', true, false, true, 'User'),

async function main() {
    // create two dummy articles

    const county1 = await prisma.counties.upsert({
        where: { id: '1' },
        update: {},
        create: {
            id: '1',
            name: 'County A',
            latitude: '40.7128',
            longitude: '-74.0060'
        },
    });

    const county2 = await prisma.counties.upsert({
        where: { id: '2' },
        update: {},
        create: {
            id: '2',
            name: 'County B',
            latitude: '37.7749',
            longitude: '-122.4194'
        },
    });

    const county3 = await prisma.counties.upsert({
        where: { id: '3' },
        update: {},
        create: {
            id: '3',
            name: 'County C',
            latitude: '51.5074',
            longitude: '-0.1278'
        },
    });

  const user1 = await prisma.user.upsert({
        where: { id: '1' },
        update: {},
        create: {
            id: '1',
            email: 'user1@example.com',
      password: await bcrypt.hash('password1', 10),
            county_id: '1',
            covid_alerts: true,
            security_alerts: false,
            fire_alerts: false,
            user_type: 'USER'
        },
    });

    const user2 = await prisma.user.upsert({
        where: { id: '2' },
        update: {},
        create: {
            id: '2',
            email: 'user2@example.com',
            password: await bcrypt.hash("password2", 10),
            county_id: '2',
            covid_alerts: true,
            security_alerts: false,
            fire_alerts: false,
            user_type: 'USER'
        },
    });

    const admin = await prisma.user.upsert({
        where: { id: uuidv4() },
        update: {},
        create: {
            id: '3',
            email: 'admin@example.com',
            password: await bcrypt.hash("password3", 10),
            county_id: '3',
            covid_alerts: true,
            security_alerts: false,
            fire_alerts: false,
            user_type: 'ADMIN'
        },
    });


    

    // Covid Alert

    await prisma.covidAlert.upsert({
        where: { id: '1' },
        update: {},
        create: {
            id: '1',
            county_id: '1',
            message: 'COVID Alert 1',
            created_at:  new Date('2022-01-01 00:00:00')
        },
    });

    await prisma.covidAlert.upsert({
        where: { id: '2' },
        update: {},
        create: {
            id: '2',
            county_id: '1',
            message: 'COVID Alert 2',
            created_at:  new Date('2022-01-01 00:00:00')
        },
    });

    await prisma.covidAlert.upsert({
        where: { id: '3' },
        update: {},
        create: {
            id: '3',
            county_id: '2',
            message: 'COVID Alert 3',
            created_at:  new Date('2022-01-01 00:00:00')
        },
    });

    // Fire Alert

    await prisma.fireAlert.upsert({
        where: { id: '1' },
        update: {},
        create: {
            id: '1',
            county_id: '2',
            message: 'Fire Alert 1',
            created_at:  new Date('2022-01-01 00:00:00')
        },
    });

    await prisma.fireAlert.upsert({
        where: { id: '2' },
        update: {},
        create: {
            id: '2',
            county_id: '2',
            message: 'Fire Alert 2',
            created_at:  new Date('2022-01-01 00:00:00')
        },
    });

    await prisma.fireAlert.upsert({
        where: { id: '3' },
        update: {},
        create: {
            id: '3',
            county_id: '3',
            message: 'Fire Alert 2',
            created_at:  new Date('2022-01-01 00:00:00')
        },
    });

    // Security Alert

    await prisma.securityAlert.upsert({
        where: { id: '1' },
        update: {},
        create: {
            id: '1',
            county_id: '3',
            message: 'Security Alert 1',
            created_at:  new Date('2022-01-01 00:00:00')
        },
    });

    await prisma.securityAlert.upsert({
        where: { id: '2' },
        update: {},
        create: {
            id: '2',
            county_id: '3',
            message: 'Security Alert 2',
            created_at:  new Date('2022-01-01 00:00:00')
        },
    });

    await prisma.securityAlert.upsert({
        where: { id: '3' },
        update: {},
        create: {
            id: '3',
            county_id: '1',
            message: 'Security Alert 3',
            created_at:  new Date('2022-01-01 00:00:00')
        },
    });

    // Post
    await prisma.post.upsert({
        where: { id: '1' },
        update: {},
        create: {
            id: '1',
            user_id: '1',
            title: 'Post 1',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            created_at:  new Date('2022-01-01 00:00:00'),
            updated_at:  new Date('2022-01-01 01:00:00')
        },
    });

    await prisma.post.upsert({
        where: { id: '2' },
        update: {},
        create: {
            id: '2',
            user_id: '2',
            title: 'Post 2',
            content: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            created_at:  new Date('2022-01-02 00:00:00'),
            updated_at:  new Date('2022-01-02 01:00:00')
        },
    });

    await prisma.post.upsert({
        where: { id: '3' },
        update: {},
        create: {
            id: '3',
            user_id: '3',
            title: 'Post 3',
            content: 'Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
            created_at:  new Date('2022-01-03 00:00:00'),
            updated_at:  new Date('2022-01-03 01:00:00')

        },
    });

    console.log({ user1, user2 });
}

// execute the main function
main()
    .catch((e) => {
        console.error(e);
    })
    .finally(async () => {
        // close Prisma Client at the end
        await prisma.$disconnect();
    });
