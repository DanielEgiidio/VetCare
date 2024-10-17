import { Models } from "node-appwrite";

export interface Patient extends Models.Document {
  userId: string;
  name: string;
  email: string;
  phone: string;
  birthDate: Date;
  gender: Gender;
  ownerIdType: string | undefined;
  ownerId: string | undefined;
  ownerIdDocument: FormData | undefined;
  address: string;
  occupation: string | undefined;
  primaryVet: string | undefined;
  sex: Sex;
  age: number | string;
  petName: string | undefined;
  weight: string;
  healthPlan: string | undefined;
  healthPlanNumber: string | undefined;
  mainComplain: string | undefined;
  deworming: string | undefined;
  pastMedicalHistory: string | undefined;
  privacyConsent: boolean;
}

export interface Appointment extends Models.Document {
  patient: Patient;
  schedule: Date;
  status: Status;
  primaryVet: string;
  reason: string;
  note: string;
  userId: string;
  cancellationReason: string | null;
}
