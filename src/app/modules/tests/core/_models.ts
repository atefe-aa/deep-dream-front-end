export interface TestsModel {
  id: number;
  name: string;
  nationalId: string;
  age: number;
  ageUnit: string;
  gender: string;
  date: string;
  registrationCode: number;
  img: string | null;
  project: string | null;
  senderRegistrationCode: string;
  testType: string;
  description: string;
  laboratory: string;
  progress: string;
  price: number;
  numberOfSlides: number;
  durations: number;
}

export interface RegistrationRequestModel {
  name: string;
  nationalId: string;
  age: string;
  doctorName: string;
  ageUnit:  "year" | "day";
  gender: "male" | "female";
  testType: number;
  laboratoryId: number;
  description: string;
  senderRegisterCode: string;
  isMultiSlide: boolean;
  numberOfSlides: number;
}
