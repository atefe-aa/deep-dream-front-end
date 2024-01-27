export interface TestTypesModel {
  id: number;
  title: string;
  code: string;
  gender: "male" | "female" | "both";
  description: string;
  type: "optical" | "invert" | "fluorescent";
  numberOfLayers: number;
  z: number | null;
  condenseur: number | null;
  brightness: number | null;
  magnification: 2 | 10 | 40 | 100;
}
