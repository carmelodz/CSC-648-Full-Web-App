// Base interface for user profile information
export interface IUser {
  id: string;
  email: string;
  password: string;
  role: "USER" | "DIRECTOR_COUNTY" | "ADMIN";
  directorStatus: string;
  directorAlert: string;
  countyName: string;
}

export interface IUserConfiguration {
  countyName: string;
  health_alerts: boolean;
  fire_alerts: boolean;
  security_alerts: boolean;
  weather_alerts: boolean;
}

export type IUserUpdateDto = Partial<IUser>;
