// Base interface for alert fields
export interface IAlert {
  id: string;
  lat: number;
  lng: number;
  severity: number;
  type: "WEATHER" | "SECURITY" | "HEALTH" | "FIRE";
  department: string;
  created_at: string;
  title: string;
  description: string;
  zipCode?: string;
  countyName?: string;
}
