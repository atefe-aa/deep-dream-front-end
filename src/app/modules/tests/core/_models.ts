import { ReportTemplateModel } from "../../reports/_model";

export interface TestsModel {
  id: number;
  name: string;
  nationalId: string;
  age: number;
  ageUnit: "year" | "day";
  gender: "female" | "male";
  date: string;
  registrationCode: number;
  img: string | null;
  project: string | null;
  senderRegistrationCode: string;
  doctorName: string;
  testType: string;
  description: string;
  laboratory: string;
  laboratoryId: number;
  testTypeId: number;
  progress: string;
  price: number;
  numberOfSlides: number;
  durations: number;
  report?: ReportTemplateModel;
}

export interface RegistrationRequestModel {
  name: string;
  nationalId: string;
  age: number;
  doctorName: string;
  ageUnit: "year" | "day";
  gender: "male" | "female";
  testType: number;
  laboratoryId: number;
  description: string;
  senderRegistrationCode: string;
  isMultiSlide: boolean;
  numberOfSlides: number;
}


export interface MiladAdmitInfo {
  id: string;
  name: string;
  nationalId: string;
  age: number;
  ageUnit: string;
  gender: string;
  description: string;
  // Add other properties as needed
}
