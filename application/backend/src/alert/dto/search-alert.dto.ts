import { AlertType, County } from '@prisma/client';

export interface SearchAlertsDto {
  types: AlertType[];
  contentSearch: string;
  countySearch: County[];
  zipCode: string;
}
