import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import TextField from "../../components/TextField";
import * as S from "./styles";
import Button from "../../components/Buttons";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { IconButton } from "../../components/Buttons/IconButton";
import { useHistory } from "react-router-dom";
import routes from "../../router/routes";
import { useState } from "react";
import {
  applyCPFMask,
  formatDateToDayMonthYear,
  getCPFNumbers,
} from "../../helpers/formatters";
import { useCreateRegistration } from "../../hooks/useCreateRegistration";
import { REGISTRATION_STATUS } from "../Dashboard/constants";
import {
  validateCPF,
  validateEmail,
  validateName,
} from "../../helpers/validations";

const NewUserPage = () => {
  const history = useHistory();

  const [isErrorSnackbarOpen, setIsErrorSnackbarOpen] = useState(false);

  const [employeeName, setEmployeeName] = useState("");
  const [email, setEmail] = useState("");
  const [CPFValueFormatted, setCPFValueFormatted] = useState("");
  const [admissionDate, setAdmissionDate] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [CPFError, setCPFError] = useState("");

  const goToHome = (state: object) => {
    history.push({
      pathname: routes.dashboard,
      state,
    });
  };

  const onErrorCallback = () => setIsErrorSnackbarOpen(true);
  const onSuccessCallback = () =>
    goToHome({
      registration: "new",
    });

  const { createRegistration, isCreateRegistrationLoading } =
    useCreateRegistration(onSuccessCallback, onErrorCallback);

  const hasErrors = nameError || emailError || CPFError;
  const hasAllFieldsFilled =
    email && employeeName && CPFValueFormatted && admissionDate;
  const shouldDisableRegisterButton =
    hasErrors || !hasAllFieldsFilled || isCreateRegistrationLoading;

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedCPF = applyCPFMask(e.target.value);
    const CPFNumbers = getCPFNumbers(formattedCPF);

    setCPFValueFormatted(formattedCPF);
    if (validateCPF(CPFNumbers)) setCPFError("");
    else setCPFError("CPF Inválido");
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;

    setEmployeeName(name);
    if (validateName(name)) setNameError("");
    else
      setNameError(
        "Por favor, forneça um nome válido (com pelo menos 2 palavras, e que a primeira letra não seja um número.)"
      );
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;

    setEmail(email);
    if (validateEmail(email)) setEmailError("");
    else setEmailError("Por favor, forneça um email válido.");
  };

  const handleRegister = () => {
    createRegistration({
      employeeName,
      email,
      cpf: getCPFNumbers(CPFValueFormatted),
      admissionDate: formatDateToDayMonthYear(admissionDate),
      status: REGISTRATION_STATUS.REVIEW,
    });
  };

  return (
    <S.Container>
      <S.Card>
        <IconButton
          onClick={() => goToHome({})}
          aria-label="Voltar para página inicial"
        >
          <HiOutlineArrowLeft size={24} />
        </IconButton>
        <TextField
          placeholder="Nome"
          label="Nome"
          value={employeeName}
          error={nameError}
          onChange={handleNameChange}
        />
        <TextField
          placeholder="Email"
          label="Email"
          type="email"
          value={email}
          error={emailError}
          onChange={handleEmailChange}
        />
        <TextField
          placeholder="CPF"
          label="CPF"
          maxLength={14}
          error={CPFError}
          value={CPFValueFormatted}
          onChange={handleCPFChange}
        />
        <TextField
          data-testid="admission-date"
          label="Data de admissão"
          type="date"
          value={admissionDate}
          onChange={(e) => setAdmissionDate(e.target.value)}
        />
        <Button onClick={handleRegister} disabled={shouldDisableRegisterButton}>
          {isCreateRegistrationLoading ? "Enviando cadastro..." : "Cadastrar"}
        </Button>
      </S.Card>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={5000}
        open={isErrorSnackbarOpen}
        onClose={() => setIsErrorSnackbarOpen(false)}
      >
        <Alert severity={"error"} variant="filled">
          Erro ao realizar cadastro. Por favor, tente novamente.
        </Alert>
      </Snackbar>
    </S.Container>
  );
};

export default NewUserPage;
