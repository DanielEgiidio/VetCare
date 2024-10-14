export const GenderOptions = ["Masculino", "Feminino", "Outros"];
export const SexOptions = ["Macho", "Femea"];

export const PatientFormDefaultValues = {
  birthDate: new Date(Date.now()),
  age: "",
  gender: "Masculino" as Gender,
  sex: "Macho" as Sex,
  address: "",
  occupation: "",
  primaryVet: "",
  petName: "",
  mainComplain: "",
  weight: "",
  pastMedicalHistory: "",
  deworming: "",
  healthPlan: "",
  healthPlanNumber: "",
  ownerIdType: "RG",
  ownerId: "",
  ownerIdDocument: [],
  treatmentConsent: false,
  disclosureConsent: false,
  privacyConsent: false,
};

export const IdentificationTypes = ["CPF", "RG"];

export const Doctors = [
  {
    image: "/assets/images/dr-green.png",
    name: "Dr. João Verde",
  },
  {
    image: "/assets/images/dr-cameron.png",
    name: "Dra. Leila Cameron",
  },
  {
    image: "/assets/images/dr-livingston.png",
    name: "Dr. David Livingston",
  },
  {
    image: "/assets/images/dr-peter.png",
    name: "Dr. Evan Peter",
  },
  {
    image: "/assets/images/dr-powell.png",
    name: "Dra. Jane Powell",
  },
  {
    image: "/assets/images/dr-remirez.png",
    name: "Dr. Alex Ramirez",
  },
  {
    image: "/assets/images/dr-lee.png",
    name: "Dra. Jasmine Lee",
  },
  {
    image: "/assets/images/dr-cruz.png",
    name: "Dra. Alyana Cruz",
  },
  {
    image: "/assets/images/dr-sharma.png",
    name: "Dr. Hardik Sharma",
  },
];

export const StatusIcon = {
  scheduled: "/assets/icons/check.svg",
  pending: "/assets/icons/pending.svg",
  cancelled: "/assets/icons/cancelled.svg",
};
