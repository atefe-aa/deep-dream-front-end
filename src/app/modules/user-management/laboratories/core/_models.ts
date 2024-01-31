export interface PriceModel {
  id: number;
  testName: string;
  testPrice: number;
  description: string;
  testExtraPrice: number;
}
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
  prices?: Array<PriceModel>;
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

export interface MetaModel {
  current_page: number;
  from: number;
  last_page: number;
  links: Array<{
    url: string | null;
    label: string;
    active: boolean;
  }>;
  path: string;
  per_page: number;
  to: number;
  total: number;
}
