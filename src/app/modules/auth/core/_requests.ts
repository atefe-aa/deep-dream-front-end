import axios from "axios";
import { AuthModel, UserModel } from "./_models";

const API_URL = import.meta.env.VITE_APP_API_URL;

export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/verify_token`;
export const LOGIN_URL = `${API_URL}/login`;

// Server should return AuthModel
export function login(username: string, password: string) {
  return axios.post<AuthModel>(LOGIN_URL, {
    username,
    password,
  });
}

export function getUserByToken() {
  return axios.get<UserModel>(GET_USER_BY_ACCESSTOKEN_URL);
}
