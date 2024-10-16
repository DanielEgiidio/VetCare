import { z } from "zod";

export const UserFormValidation = z.object({
  name: z
    .string()
    .min(2, "O nome deve ter no mínimo 2 caracteres")
    .max(50, "O nome deve ter no máximo 50 caracteres"),
  email: z.string().email("Endereço de e-mail inválido"),
  phone: z
    .string()
    .refine(
      (phone) => /^\+\d{10,15}$/.test(phone),
      "Número de telefone inválido"
    ),
});

export const PatientFormValidation = z.object({
  name: z
    .string()
    .min(2, "O nome deve ter no mínimo 2 caracteres")
    .max(50, "O nome deve ter no máximo 50 caracteres"),
  petName: z
    .string()
    .min(2, "O nome do pet deve ter no mínimo 2 caracteres")
    .max(50, "O nome do pet deve ter no máximo 50 caracteres"),
  mainComplain: z
    .string()
    .min(2, "A queixa principal deve ter no mínimo 2 caracteres")
    .max(50, "A queixa principal deve ter no máximo 50 caracteres"),
  age: z
    .string()
    .min(2, "A idade deve ter no mínimo 1 caractere")
    .max(50, "A idade deve ter no máximo 50 caracteres"),
  email: z.string().email("Endereço de e-mail inválido"),
  phone: z
    .string()
    .refine(
      (phone) => /^\+\d{10,15}$/.test(phone),
      "Número de telefone inválido"
    ),
  birthDate: z.coerce.date(),
  gender: z.enum(["Masculino", "Feminino", "Outros"]),
  sex: z.enum(["Macho", "Fêmea"]),
  weight: z
    .string()
    .min(2, "O peso deve ter no mínimo 5 caracteres")
    .max(50, "O peso deve ter no máximo 500 caracteres"),
  address: z
    .string()
    .min(5, "O endereço deve ter no mínimo 5 caracteres")
    .max(500, "O endereço deve ter no máximo 500 caracteres"),
  occupation: z
    .string()
    .min(2, "A ocupação deve ter no mínimo 2 caracteres")
    .max(500, "A ocupação deve ter no máximo 500 caracteres"),
  primaryVet: z.string().min(2, "Selecione pelo menos um médico"),
  healthPlan: z
    .string()
    .min(2, "O nome do plano de saúde deve ter no mínimo 2 caracteres")
    .max(50, "O nome do plano de saúde deve ter no máximo 50 caracteres"),
  deworming: z
    .string()
    .min(2, "Os detalhes da vermifugação devem ter no mínimo 2 caracteres")
    .max(50, "Os detalhes da vermifugação devem ter no máximo 255 caracteres"),
  healthPlanNumber: z
    .string()
    .min(2, "O número da apólice deve ter no mínimo 2 caracteres")
    .max(50, "O número da apólice deve ter no máximo 50 caracteres"),
  pastMedicalHistory: z.string().optional(),
  ownerIdType: z.string().optional(),
  ownerId: z.string().optional(),
  ownerIdDocument: z.custom<File[]>().optional(),
  treatmentConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "Você deve consentir com o tratamento para continuar",
    }),
  disclosureConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "Você deve consentir com a divulgação para continuar",
    }),
  privacyConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "Você deve consentir com a privacidade para continuar",
    }),
});

export const CreateAppointmentSchema = z.object({
  primaryVet: z.string().min(2, "Selecione pelo menos um médico"),
  schedule: z.coerce.date(),
  reason: z
    .string()
    .min(2, "O motivo deve ter no mínimo 2 caracteres")
    .max(500, "O motivo deve ter no máximo 500 caracteres"),
  note: z.string().optional(),
  cancellationReason: z.string().optional(),
});

export const ScheduleAppointmentSchema = z.object({
  primaryVet: z.string().min(2, "Selecione pelo menos um médico"),
  schedule: z.coerce.date(),
  reason: z.string().optional(),
  note: z.string().optional(),
  cancellationReason: z.string().optional(),
});

export const CancelAppointmentSchema = z.object({
  primaryVet: z.string().min(2, "Selecione pelo menos um médico"),
  schedule: z.coerce.date(),
  reason: z
    .string()
    .min(2, "O motivo deve ter no mínimo 2 caracteres")
    .max(500, "O motivo deve ter no máximo 500 caracteres"),
  note: z.string().optional(),
  cancellationReason: z.string().optional(),
});

export function getAppointmentSchema(type: string) {
  switch (type) {
    case "create":
      return CreateAppointmentSchema;
    case "cancel":
      return CancelAppointmentSchema;
    default:
      return ScheduleAppointmentSchema;
  }
}
