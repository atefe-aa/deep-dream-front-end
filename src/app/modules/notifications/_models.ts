export interface NotificationModel {
  id: string;
  data: {
    title: string;
    description: string;
    state: string;
    type: string;
  };
  time: string;
}

export interface MetaModel {
  last_page: number;
  current_page: number;
  from: 1;
  per_page: number;
  to: number;
  total: number;
}

export interface NotificationResponse {
  data: NotificationModel[];
  meta: MetaModel;
}
