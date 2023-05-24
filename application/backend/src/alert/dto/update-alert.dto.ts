import { PartialType } from '@nestjs/swagger';
import { RequestStatus } from '@prisma/client';
import { CreateAlertDto } from './create-alert.dto';

export class UpdateAlertDto extends PartialType(CreateAlertDto) {
  alertStatus?: RequestStatus;
}
