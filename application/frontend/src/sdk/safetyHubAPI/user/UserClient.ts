import { AxiosInstance, AxiosResponse } from "axios";
import { IUser, IUserUpdateDto, IUserConfiguration } from "./types";
import { IAlert } from "../alerts/types";

// Custom API client for user data retrieval and creation
export class UserClient {
  private apiClient: AxiosInstance;

  private route: string;

  constructor(apiClient: AxiosInstance, route = "/user") {
    this.apiClient = apiClient;
    this.route = route;
  }

  public async getUsers(): Promise<IUser[]> {
    const response = await this.apiClient.get<IUser[]>(`${this.route}`);
    return response.data;
  }

  public async getDirectors(): Promise<IUser[]> {
    const response = await this.apiClient.get<IUser[]>(
      `${this.route}/directors`
    );
    return response.data;
  }

  /* Receives id from logged in user and retrieves alerts that are 24 hour fresh */
  public async getNotifications(): Promise<IAlert[]> {
    return this.apiClient
      .get(`${this.route}/notifications`)
      .then((response) => response.data as IAlert[])
      .catch((error) => {
        return Promise.reject(error);
      });
  }

  public async updateUser(
    UserID: string,
    user: IUserUpdateDto
  ): Promise<IUser> {
    return this.apiClient
      .patch(`${this.route}/${UserID}`, user)
      .then((response) => response.data as IUser)
      .catch((error) => {
        return Promise.reject(error);
      });
  }

  /* Takes in settings and updates them */
  public async updateUserSettings(settings: {
    fire_alerts?: boolean;
    weather_alerts?: boolean;
    health_alerts?: boolean;
    security_alerts?: boolean;
    countyName?: string;
  }): Promise<IUserConfiguration> {
    return this.apiClient
      .patch(`${this.route}/settings`, settings)
      .then((response) => response.data as IUserConfiguration)
      .catch((error) => {
        return Promise.reject(error);
      });
  }

  public async deleteUser(UserID: string): Promise<AxiosResponse> {
    return this.apiClient.delete(`${this.route}/${UserID}`);
  }
}
