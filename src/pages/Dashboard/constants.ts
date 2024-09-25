import { RegistrationState } from "./index";

export enum REGISTRATION_STATUS {
  REVIEW = "REVIEW",
  APPROVED = "APPROVED",
  REPROVED = "REPROVED",
}

export enum REGISTRATION_STATUS_MAPPER_CONFIRMATION {
  REVIEW = "revisar novamente",
  APPROVED = "aprovar",
  REPROVED = "reprovar",
}

export const getInitialSnackbarProps = (registrationState: RegistrationState) =>
  registrationState?.registration === "new"
    ? {
        open: true,
        message: "Cadastro realizado com sucesso!",
        severity: "success",
      }
    : {
        open: false,
        message: "",
        severity: "",
      };
