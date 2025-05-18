import axiosConfig from "./axios";

const AUTH = "/auth";

class AuthService {
  async signup(data: any): Promise<any> {
    return await axiosConfig.post(`${AUTH}/signup`, data);
  }

  async signin(data: any): Promise<any> {
    return await axiosConfig.post(`${AUTH}/signin`, data);
  }

  async signout(): Promise<any> {
    return await axiosConfig.post(`${AUTH}/signout`);
  }

  async refreshToken(): Promise<any> {
    return await axiosConfig.post(`${AUTH}/refresh-token`, {
        refreshToken: localStorage.getItem("refreshToken"),
      }, {
        withCredentials: true,
      });
  }
}

export default new AuthService();
