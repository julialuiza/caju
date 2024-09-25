type RegistrationStatus = "REVIEW" | "APPROVED" | "REPROVED";

type Registration = {
  id: string;
  admissionDate: string;
  email: string;
  employeeName: string;
  status: RegistrationStatus;
  cpf: string;
};

type NewRegistration = {
  admissionDate: string;
  email: string;
  employeeName: string;
  status: RegistrationStatus;
  cpf: string;
};

export type { Registration, NewRegistration };
