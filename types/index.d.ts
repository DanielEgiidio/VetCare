declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

declare type Sex = "Macho" | "Femea";
declare type Gender = "Masculino" | "Feminino" | "Outros";
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
  age: string;
  birthDate: Date;
  gender: Gender;
  sex: Sex;
  address: string;
  weight: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  pastMedicalHistory: string | undefined;
  healthPlan: string;
  occupation: string;
  healthPlanNumber: string;
  ambience: string | undefined;
  mainComplain: string | undefined;
  feed: string | undefined;
  deworming: string | undefined;
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
