"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Image from "next/image";

import { Form, FormControl } from "@/components/ui/form";
import "react-phone-number-input/style.css";

import SubmitButton from "../SubmitButton";
import ReusableFormField, { FormFieldType } from "../ReusableFormField";
import { PatientFormValidation } from "@/lib/validationForm";
import { registerPatient } from "@/lib/actions/patient.actions";
import {
  Doctors,
  GenderOptions,
  IdentificationTypes,
  PatientFormDefaultValues,
  SexOptions,
} from "@/constants";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { SelectItem } from "../ui/select";
import FileUploader from "../FileUploader";
import CustomFormField from "../ReusableFormField";

const RegisterForm = ({ user }: { user: User }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      ...PatientFormDefaultValues,
      name: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof PatientFormValidation>) => {
    console.log("Erros de Validação:", form.formState.errors);

    setIsLoading(true); // Ativando loading
    console.log("Formulário enviado com valores:", values);

    let formData;
    if (values.ownerIdDocument && values.ownerIdDocument?.length > 0) {
      console.log(
        "Documento de Identificação Detectado:",
        values.ownerIdDocument
      );
      const blobFile = new Blob([values.ownerIdDocument[0]], {
        type: values.ownerIdDocument[0].type,
      });

      formData = new FormData();
      formData.append("blobFile", blobFile);
      formData.append("fileName", values.ownerIdDocument[0].name);
    } else {
      console.warn("Nenhum documento de identificação foi fornecido");
    }

    try {
      const patient = {
        userId: user.$id,
        name: values.name,
        email: values.email,
        phone: values.phone,
        birthDate: new Date(values.birthDate),
        age: values.age,
        gender: values.gender,
        sex: values.sex,
        address: values.address,
        occupation: values.occupation,
        emergencyContactName: values.emergencyContactName,
        emergencyContactNumber: values.emergencyContactNumber,
        primaryVet: values.primaryVet,
        mainComplain: values.mainComplain,
        healthPlan: values.healthPlan,
        healthPlanNumber: values.healthPlanNumber,
        deworming: values.deworming,
        feed: values.feed,
        weight: values.weight,
        ambience: values.ambience,
        pastMedicalHistory: values.pastMedicalHistory || "",
        ownerIdType: values.ownerIdType || "",
        ownerId: values.ownerId || "",
        ownerIdDocument: values.ownerIdDocument ? formData : undefined,
        privacyConsent: values.privacyConsent,
      };

      console.log("Tentando registrar paciente:", patient);

      const newPatient = await registerPatient(patient);

      console.log("Paciente registrado:", newPatient);

      if (newPatient) {
        router.push(`/patients/${user.$id}/new-appointment`);
      }
    } catch (error) {
      console.error("Erro ao registrar paciente:", error);
    } finally {
      setIsLoading(false); // Desativando loading após tentativa
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex-1 space-y-12"
      >
        <section className="space-y-4">
          <h1 className="header">
            Bem vindo {user.name.trim().split(" ")[0]}👋
          </h1>
          <p className="text-dark-700">
            Para atendermos melhor o seu pet, precisamos de algumas informações.
          </p>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Informações do tutor</h2>
          </div>
        </section>

        <ReusableFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          label="Nome Completo"
          name="name"
          placeholder="Seu José da Silva"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />

        <div className="flex flex-col gap-6 xl:flex-row">
          <ReusableFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="email"
            label="Email"
            placeholder="seujosé@gmail.com"
            iconSrc="/assets/icons/email.svg"
            iconAlt="email"
          />

          <ReusableFormField
            fieldType={FormFieldType.PHONE_INPUT}
            control={form.control}
            name="phone"
            label=" Numero de celular"
            placeholder="(555) 123-4567"
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <ReusableFormField
            fieldType={FormFieldType.DATE_PICKER}
            control={form.control}
            name="birthDate"
            label="Data de nascimento"
          />

          <ReusableFormField
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name="gender"
            label="Gênero"
            renderSkeleton={(field) => (
              <FormControl>
                <RadioGroup
                  className="flex h-11 gap-6 xl:justify-between"
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  {GenderOptions.map((option, i) => (
                    <div key={option + i} className="radio-group">
                      <RadioGroupItem value={option} id={option} />
                      <Label htmlFor={option} className="cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
            )}
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <ReusableFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="address"
            label="Endereço"
            placeholder="Rua qualquer, 123, centro"
          />
          <ReusableFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="occupation"
            label="Ocupação"
            placeholder="Professor"
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <ReusableFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="emergencyContactName"
            label="Nome do contato de emergência"
            placeholder="Nome do tutor | Nome do responsável"
          />

          <ReusableFormField
            fieldType={FormFieldType.PHONE_INPUT}
            control={form.control}
            name="emergencyContactNumber"
            label="Contato de emergência"
            placeholder="(83) 99999-9999"
          />
        </div>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Informações médicas do pet</h2>
          </div>
        </section>

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
          fieldType={FormFieldType.TEXTAREA}
          control={form.control}
          name="mainComplain"
          label="Queixa principal"
          placeholder="Comente aqui brevemente a sua queixa principal"
        />

        <ReusableFormField
          fieldType={FormFieldType.SKELETON}
          control={form.control}
          name="sex"
          label="Gênero do pet"
          renderSkeleton={(field) => (
            <FormControl>
              <RadioGroup
                className="flex h-11 gap-6 xl:justify-between"
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                {SexOptions.map((option, i) => (
                  <div key={option + i} className="radio-group">
                    <RadioGroupItem value={option} id={option} />
                    <Label htmlFor={option} className="cursor-pointer">
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </FormControl>
          )}
        />

        <div className="flex flex-col gap-6 xl:flex-row">
          <ReusableFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="age"
            label="Idade do pet"
            placeholder="2 anos"
          />
          <ReusableFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="weight"
            label="Peso"
            placeholder="5kg"
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <ReusableFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="ambience"
            label="Ambientação"
            placeholder="O pet foi introduzido gradualmente em diferentes cômodos da casa, com acesso a brinquedos e um espaço tranquilo para se acostumar."
          />
          <ReusableFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="feed"
            label="Alimentação"
            placeholder=" Alimentação 2 vezes ao dia com ração específica para cães adultos e água fresca disponível o dia todo."
          />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row">
          <ReusableFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="pastMedicalHistory"
            label="Histórico médico"
            placeholder=" O pet foi diagnosticado com alergia alimentar em 2021 e tratado com dieta específica. Não possui outras condições crônicas."
          />
          <ReusableFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="deworming"
            label="Vermifugação"
            placeholder="Última vermifugação em março de 2024 com o produto XYZ."
          />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <ReusableFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="healthPlan"
            label="Plano de saúde"
            placeholder="Petlove"
          />
          <ReusableFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="healthPlanNumber"
            label="Número do plano de saúde"
            placeholder="PLV-2309-ABCD-8765"
          />
        </div>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Identificação e verificação</h2>
          </div>
        </section>

        <ReusableFormField
          fieldType={FormFieldType.SELECT}
          control={form.control}
          name="ownerIdType"
          label="Tipo de identificação"
          placeholder="Selecione seu documento de identificação"
        >
          {IdentificationTypes.map((types) => (
            <SelectItem key={types} value={types}>
              {types}
            </SelectItem>
          ))}
        </ReusableFormField>

        <ReusableFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="ownerId"
          label="Número de identificação"
          placeholder="123456789"
        />

        <ReusableFormField
          fieldType={FormFieldType.SKELETON}
          control={form.control}
          name="ownerIdDocument"
          label="Foto do documento de identificação"
          renderSkeleton={(field) => (
            <FormControl>
              <FileUploader files={field.value} onChange={field.onChange} />
            </FormControl>
          )}
        />

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Termos de uso e privacidade</h2>
          </div>
        </section>

        <CustomFormField
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="treatmentConsent"
          label="Concordo com o uso e divulgação informações de saúde do meu pet para fins de tratamento"
        />

        <CustomFormField
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="disclosureConsent"
          label="Concordo em receber o tratamento para o estado de saúde do meu pet"
        />

        <CustomFormField
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="privacyConsent"
          label="Eu li e aceito os termos de uso e privacidade"
        />

        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  );
};

export default RegisterForm;
