/* eslint import/no-relative-packages: "off" */
import { IAlert } from "../../sdk/safetyHubAPI/alerts/types";
import { LegendMapThresholds } from "./mapConfig";

export const countiesName: string[] = [
  "Alameda",
  "Alpine",
  "Amador",
  "Butte",
  "Calaveras",
  "Colusa",
  "Contra Costa",
  "Del Norte",
  "El Dorado",
  "Fresno",
  "Glenn",
  "Humboldt",
  "Imperial",
  "Inyo",
  "Kern",
  "Kings",
  "Lake",
  "Lassen",
  "Los Angeles",
  "Madera",
  "Marin",
  "Mariposa",
  "Mendocino",
  "Merced",
  "Modoc",
  "Mono",
  "Monterey",
  "Napa",
  "Nevada",
  "Orange",
  "Placer",
  "Plumas",
  "Riverside",
  "Sacramento",
  "San Benito",
  "San Bernardino",
  "San Diego",
  "San Francisco",
  "San Joaquin",
  "San Luis Obispo",
  "San Mateo",
  "Santa Barbara",
  "Santa Clara",
  "Santa Cruz",
  "Shasta",
  "Sierra",
  "Siskiyou",
  "Solano",
  "Sonoma",
  "Stanislaus",
  "Sutter",
  "Tehama",
  "Trinity",
  "Tulare",
  "Tuolumne",
  "Ventura",
  "Yolo",
  "Yuba",
];

export function countDepartmentOccurrences(
  alerts: IAlert[]
): Record<string, number> {
  const departmentOccurrences: Record<string, number> = {};

  alerts.forEach((alert) => {
    const { countyName } = alert;
    const department = countyName.replace(/([A-Z])/g, " $1").trim();
    if (departmentOccurrences[department]) {
      departmentOccurrences[department] += 1;
    } else {
      departmentOccurrences[department] = 1;
    }
  });

  return departmentOccurrences;
}

// export const departmentOccurrences = countDepartmentOccurrences(alertData);

export const getColorByThreshold = (number: number) => {
  for (let i = 0; i < LegendMapThresholds.length; i += 1) {
    const { color, rangeColor } = LegendMapThresholds[i];
    if (number >= rangeColor[0] && number <= rangeColor[1]) {
      return color;
    }
  }
  return "transparent";
};
