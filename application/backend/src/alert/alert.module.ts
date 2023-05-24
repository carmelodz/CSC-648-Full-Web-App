import { Module } from '@nestjs/common';
import { AlertService } from './alert.service';
import { AlertController } from './alert.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [AlertController],
  providers: [AlertService, PrismaService],
})
export class AlertModule {}
