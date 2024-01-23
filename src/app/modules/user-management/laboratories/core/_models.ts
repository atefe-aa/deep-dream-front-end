export interface LabsModel {
  id: number;
  labName: string;
  fullName: string;
  phone: string;
  address: string;
  description: string;
  username: string;
  avatar?: string;
  header?: string;
  footer?: string;
  signature?: string;
}

export interface LabDataModel {
  id?: number;
  labName: string;
  fullName: string;
  phone: string;
  address: string;
  description: string;
  username: string;
  password: string;
  password_confirmation: string;
  avatar: File | undefined;
  header: File | undefined;
  footer: File | undefined;
  signature: File | undefined;
}
