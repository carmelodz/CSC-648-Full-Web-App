import { AxiosInstance, AxiosResponse } from "axios";
import { IProfile } from "./types";
// Custom API client for user authentication
export class AuthClient {
  private apiClient: AxiosInstance;

  private route: string;

  constructor(apiClient: AxiosInstance, route = "/auth") {
    this.apiClient = apiClient;
    this.route = route;
  }

  public async login(email: string, password: string): Promise<AxiosResponse> {
    return this.apiClient.post(`${this.route}/login`, {
      email,
      password,
    });
  }

  public async logout(): Promise<AxiosResponse> {
    return this.apiClient.post(`${this.route}/logout`, {});
  }

  public async register(
    email: string,
    password: string,
    countyName: string | undefined
  ): Promise<AxiosResponse> {
    return this.apiClient.post(`${this.route}/register`, {
      email,
      password,
      countyName,
    });
  }

  public async registerDirector(
    email: string,
    password: string,
    directorAlert: "WEATHER" | "SECURITY" | "HEALTH" | "FIRE" | undefined,
    countyName: string | undefined
  ): Promise<AxiosResponse> {
    return this.apiClient.post(`${this.route}/register/director`, {
      email,
      password,
      directorAlert,
      countyName,
    });
  }

  public async changePassword(
    currentPassword: string,
    newPassword: string,
    confirmNewPassword: string
  ): Promise<AxiosResponse> {
    return this.apiClient.patch(`${this.route}/changepassword`, {
      currentPassword,
      newPassword,
      confirmNewPassword,
    });
  }

  public async getProfile(): Promise<IProfile> {
    const res = await this.apiClient.get(`${this.route}/me`);
    return res.data;
  }
}
