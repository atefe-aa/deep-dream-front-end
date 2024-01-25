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

  export const TestsTableColumns =[
    {
        title:"Ragistration",
        id:"registration"
    },  {
        title:"Ragistration",
        id:"registration"
    },
  ]