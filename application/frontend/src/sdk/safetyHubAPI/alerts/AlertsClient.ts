import { AxiosInstance, AxiosResponse } from "axios";
import {
  IAlert,
  IAlertCreateDto,
  IAlertUpdateDto,
  ISearchAlertDto,
} from "./types";

// Using an axios fetching schema to retrieve data from backend/database
export class AlertsClient {
  private apiClient: AxiosInstance;

  private route: string;

  constructor(apiClient: AxiosInstance, route = "/alert") {
    this.apiClient = apiClient;
    this.route = route;
  }

  // TODO Refactor searchAlert
  public async search(searchAlert: ISearchAlertDto): Promise<IAlert[]> {
    return this.apiClient
      .post(`${this.route}/search`, searchAlert)
      .then((response) => response.data as IAlert[])
      .catch((error) => {
        return Promise.reject(error);
      });
  }

  public async createAlert(alert: IAlertCreateDto): Promise<IAlert> {
    return this.apiClient
      .post(`${this.route}`, alert)
      .then((response) => response.data as IAlert)
      .catch((error) => {
        return Promise.reject(error);
      });
  }

  public async getAlerts(): Promise<IAlert[]> {
    const response = await this.apiClient.get<IAlert[]>(`${this.route}`);
    return response.data;
  }

  public async getAlertsApproved(): Promise<IAlert[]> {
    const response = await this.apiClient.get<IAlert[]>(
      `${this.route}/approved`
    );
    return response.data;
  }

  public async getAlert(AlertID: string): Promise<IAlert> {
    const response = await this.apiClient.get<IAlert>(
      `${this.route}/${AlertID}`
    );
    return response.data;
  }

  public async updateAlert(
    AlertID: string,
    alert: IAlertUpdateDto
  ): Promise<IAlert> {
    return this.apiClient
      .patch(`${this.route}/${AlertID}`, alert)
      .then((response) => response.data as IAlert)
      .catch((error) => {
        return Promise.reject(error);
      });
  }

  public async deleteAlert(AlertID: string): Promise<AxiosResponse> {
    return this.apiClient.delete(`${this.route}/${AlertID}`);
  }
}
