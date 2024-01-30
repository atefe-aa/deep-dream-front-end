export interface AuthModel {
  api_token: string;
  refreshToken?: string;
}

export interface UserModel {
 data:{
  id: number;
  username: string;
  labName?: string | null;
  name: string;
  phone?: string;
  roles?: Array<string>;
  picture?: string | null;
 } 
}
