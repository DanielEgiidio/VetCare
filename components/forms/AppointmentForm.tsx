"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";
import { Form } from "@/components/ui/form";

import "react-phone-number-input/style.css";

import SubmitButton from "../SubmitButton";
import ReusableFormField, { FormFieldType } from "../ReusableFormField";
import { getAppointmentSchema } from "@/lib/validationForm";
import { Doctors } from "@/constants";
import { SelectItem } from "../ui/select";
import { createAppointment } from "@/lib/actions/appointment.actions";

export const AppointmentForm = ({
  userId,
  patientId,
  type,
}: {
  userId: string;
  patientId: string;
  type: "create" | "cancel" | "schedule";
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const AppointmentFormValidation = getAppointmentSchema(type);

  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      primaryVet: "",
      schedule: new Date(),
      reason: "",
      note: "",
      cancellationReason: "",
    },
  });

  const onSubmit = async (
    values: z.infer<typeof AppointmentFormValidation>
  ) => {
    setIsLoading(true);

    let status;
    switch (type) {
      case "schedule":
        status = "scheduled";
        break;
      case "cancel":
        status = "cancelled";
        break;
      default:
        status = "pending";
    }

    try {
      if (type === "create" && patientId) {
        const appointment = {
          userId,
          patient: patientId,
          primaryVet: values.primaryVet,
          schedule: new Date(values.schedule),
          reason: values.reason!,
          status: status as Status,
          note: values.note,
        };

        const newAppointment = await createAppointment(appointment);

        if (newAppointment) {
          form.reset();
          router.push(
            `/patients/${userId}/new-appointment/success?appointmentId=${newAppointment.$id}`
          );
        }
        //   } else {
        //     const appointmentToUpdate = {
        //       userId,
        //       appointmentId: appointment?.$id!,
        //       appointment: {
        //         primaryVet: values.primaryVet,
        //         schedule: new Date(values.schedule),
        //         status: status as Status,
        //         cancellationReason: values.cancellationReason,
        //       },
        //       type,
        //     };

        //     const updatedAppointment = await updateAppointment(appointmentToUpdate);

        //     if (updatedAppointment) {
        //       setOpen && setOpen(false);
        //       form.reset();
        //     }
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };
  let buttonLabel;

  switch (type) {
    case "create":
      buttonLabel = "Criar Consulta";
      break;
    case "cancel":
      buttonLabel = "Cancelar Consulta";
      break;
    case "schedule":
      buttonLabel = "Agendar Consulta";
      break;
    default:
      break;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
        <section className="mb-12 space-y-4">
          <h1 className="header">Estamos quase la!</h1>
          <p className="text-dark-700">Vamos agendar agora sua consulta</p>
        </section>

        {type !== "cancel" && (
          <>
            <ReusableFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="primaryVet"
              label="Médico responsável"
              placeholder="Selecione seu médico responsável"
            >
              {Doctors.map((doctor, i) => (
                <SelectItem key={doctor.name + i} value={doctor.name}>
                  <div className="flex cursor-pointer items-center gap-2">
                    <Image
                      src={doctor.image}
                      width={32}
                      height={32}
                      alt="doctor"
                      className="rounded-full border border-dark-500"
                    />
                    <p>{doctor.name}</p>
                  </div>
                </SelectItem>
              ))}
            </ReusableFormField>

            <ReusableFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="schedule"
              label="Data da consulta"
              showTimeSelect
              dateFormat="dd/MM/yyyy h:mm aa"
            />

            <div
              className={`flex flex-col gap-6  ${
                type === "create" && "xl:flex-row"
              }`}
            >
              <ReusableFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="reason"
                label="Motiva da consulta"
                placeholder="check-up anual"
              />

              <ReusableFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="note"
                label="Informações adicionais(opcional)"
                placeholder="Prefiro pela manhã ,se possivel"
              />
            </div>
          </>
        )}

        {type === "cancel" && (
          <ReusableFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="cancellationReason"
            label="Motivo do cancelamento"
            placeholder="Informe o motivo do cancelamento"
          />
        )}

        <SubmitButton
          isLoading={isLoading}
          className={`${
            type === "cancel" ? "shad-danger-btn" : "shad-primary-btn"
          } w-full`}
        >
          {buttonLabel}
        </SubmitButton>
      </form>
    </Form>
  );
};
