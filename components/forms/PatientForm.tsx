"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";

import "react-phone-number-input/style.css";

import SubmitButton from "../SubmitButton";
import ReusableFormField, { FormFieldType } from "../ReusableFormField";
import { UserFormValidation } from "@/lib/validationForm";
import { createUser } from "@/lib/actions/patient.actions";

export const PatientForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof UserFormValidation>) => {
    setIsLoading(true);

    try {
      const user = {
        name: values.name,
        email: values.email,
        phone: values.phone,
      };

      const newUser = await createUser(user);

      if (newUser) {
        router.push(`/patients/${newUser.$id}/register`);
      }
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
        <section className="mb-12 space-y-4">
          <h1 className="header">Olá seja bem-vindo 👋</h1>
          <p className="text-dark-700">Agende agora sua consulta.</p>
        </section>

        <ReusableFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label="Primeiro Nome:"
          placeholder="John"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />

        <ReusableFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="email"
          label="Email:"
          placeholder="johndoe@gmail.com"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
        />

        <ReusableFormField
          fieldType={FormFieldType.PHONE_INPUT}
          control={form.control}
          name="phone"
          label="Número de Celular:"
          placeholder="(555) 123-4567"
        />

        <SubmitButton isLoading={isLoading}>Cadastrar consulta</SubmitButton>
      </form>
    </Form>
  );
};
