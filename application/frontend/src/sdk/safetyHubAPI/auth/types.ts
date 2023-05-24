// Base interface for user profile information
export interface IProfile {
  id: string;
  email: string;
  password: string;
  role: "ADMIN" | "USER" | "DIRECTOR_COUNTY";
  directorStatus: string | null;
  directorAlert: string | null;
  countyName: string;
  health_alerts?: boolean;
  fire_alerts?: boolean;
  security_alerts?: boolean;
  weather_alerts?: boolean;
}
