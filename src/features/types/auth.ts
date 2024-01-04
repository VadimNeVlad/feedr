import { User } from "./user";

export interface AuthState {
  user: User | null;
  token: string | null;
}

export interface AuthData {
  email: string;
  name: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}
