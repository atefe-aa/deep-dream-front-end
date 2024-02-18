export interface SlideModel {
  id: number;
  nth: number;
  sw_x: number;
  sw_y: number;
  ne_x: number;
  ne_y: number;
}

export interface CoordinatesModel {
  sw: {
    x: 31;
    y: 1.23;
  };
  ne: {
    x: 1.66;
    y: 1;
  };
}
export interface ScanModel {
  id: number;
  nth: number;
  slideNumber: number;
  image: string;
  slideImage: string;
  laboratory: string;
  testNumber: number;
  testType: string;
  progress: string;
  duration: number;
  secondsLeft: number;
  coordinates: CoordinatesModel;
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

export interface ScanUpdatedEvent {
  status: string;
  currentRegion: number;
  totalRegions: number;
  imageUrl?: string;
  slideImageUrl?: string;
}
