declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

declare type Gender = "Macho" | "Femea";
declare type Status = "pending" | "scheduled" | "cancelled";

declare interface CreateUserParams {
  name: string;
  email: string;
  phone: string;
}
declare interface User extends CreateUserParams {
  $id: string;
}

declare interface RegisterUserParams extends CreateUserParams {
  userId: string;
  age: Date;
  gender: Gender;
  address: string;
  weight: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  pastMedicalHistory: string;
  healthPlan: string;
  healthPlanNumber: string;
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

declare type CreateAppointmentParams = {
  userId: string;
  patient: string;
  primaryVet: string;
  reason: string;
  schedule: Date;
  status: Status;
  note: string | undefined;
};

declare type UpdateAppointmentParams = {
  appointmentId: string;
  userId: string;
  appointment: Appointment;
  type: string;
};
