export interface SlideModel {
  id: number;
  nth: number;
  sw_x: number;
  sw_y: number;
  ne_x: number;
  ne_y: number;
}

export interface ScanModel {
  id?: number;
  nth?: number;
  slideNumber?: number;
  image?: string;
  slideImage?: string;
  laboratory?: string;
  testNumber?: number;
  testType?: string;
  progress?: string;
  duration?: number;
}

export interface AreaModel {
  sw: {
    x: number;
    y: number;
  };
  ne: {
    x: number;
    y: number;
  };
}
