import { Models } from "node-appwrite";

export interface Patient extends Models.Document {
  userId: string;
  name: string;
  email: string;
  phone: string;
  age: Date;
  gender: Gender;
  address: string;
  weight: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  primaryVet: string;
  healthPlan: string;
  healthPlanNumber: string;
  ambience: string | undefined;
  feed: string | undefined;
  deworming: string | undefined;
  pastMedicalHistory: string | undefined;
  ownerIdType: string | undefined;
  ownerId: string | undefined;
  ownerIdDocument: FormData | undefined;
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
