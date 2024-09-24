import { z } from "zod";

export const UserFormValidation = z.object({
  name: z
    .string()
    .min(3, "O seu nome deve ter pelo menos 3 caracteres.")
    .max(3, "O seu nome deve ter pelo menos 3 caracteres."),
  email: z.string().email("Email inválido"),
  phone: z
    .string()
    .refine(
      (phone) => /^\+\d{10,15}$/.test(phone),
      "Número de celular inválido"
    ),
});
