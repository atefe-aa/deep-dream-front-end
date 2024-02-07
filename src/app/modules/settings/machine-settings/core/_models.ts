export interface SettingModel {
  id: number;
  title: string;
  settings: Array<SettingItemModel>;
}

export interface SettingItemModel {
  id: number;
  key: string;
  value: number;
  unit: string;
}
