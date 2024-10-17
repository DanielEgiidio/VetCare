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
  birthDate: Date;
  sex: Sex;
  gender: Gender;
  address: string;
  primaryVet: string;
  healthPlan: string;
  healthPlanNumber: string;
  mainComplain: string;
  petName: string;
  weight: string;
  deworming: string | undefined;
  pastMedicalHistory: string | undefined;
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
