// Base interface for alert fields
export interface IAlert {
  id: string;
  lat: number;
  lng: number;
  severity: number;
  type: string;
  title: string;
  description: string;
  zipCode: string;
  countyName: string;
  alertStatus: string;
  createdAt: string;
}

export interface IAlertCreateDto {
  lat: number;
  lng: number;
  severity: number;
  type: string;
  title: string;
  description: string;
  zipCode: string;
  countyName: string;
}

export type IAlertUpdateDto = Partial<IAlertCreateDto> & {
  alertStatus?: string;
};
// Base interface for alert list, needed for searching
export interface ISearchAlertDto {
  types: string[];
  contentSearch: string;
  countySearch: string[];
  zipCode: string;
}
