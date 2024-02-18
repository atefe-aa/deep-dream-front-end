export interface TestTypesModel {
  id: number;
  title: string;
  code: string;
  gender: "male" | "female" | "both";
  description: string;
  type: "optical" | "invert" | "fluorescent";
  numberOfLayers: number;
  z: number | undefined;
  condenser: number | undefined;
  brightness: number | undefined;
  magnification: 2 | 10 | 40 | 100;
}
