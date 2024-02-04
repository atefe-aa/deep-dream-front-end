interface SlideModel {
  id?: number;
  nth: number;
  sw_x: number;
  sw_y: number;
  ne_x: number;
  ne_y: number;
}

interface ScanModel {
  id?: number;
  nth?: number;
  image?: string;
  cytomine?: string;
  laboratory?: string;
  testNumber?: number;
  testType?: string;
  progress?: string;
  duration?: number;
}
