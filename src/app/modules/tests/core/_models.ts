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
  senderRegistrationCode: string;
  testType: string;
  description: string;
  laboratory: string;
  progress: string;
  price: number;
  numberOfSlides: number;
  durations: number;
}
