import { useState } from "react";
import { HiRefresh } from "react-icons/hi";
import { useHistory } from "react-router-dom";

import Button from "../../../../components/Buttons";
import { IconButton } from "../.././../../components/Buttons/IconButton";
import TextField from "../.././../../components/TextField";
import routes from "../../../../router/routes";
import * as S from "./styles";
import { applyCPFMask, getCPFNumbers } from "../../../../helpers/formatters";
import { validateCPF } from "../../../../helpers/validations";

type SearchBarProps = {
  refetchRegistrations: () => void;
  setCPFValueForSearch: (CPF: string) => void;
};

export const SearchBar = (props: SearchBarProps) => {
  const { refetchRegistrations, setCPFValueForSearch } = props;

  const history = useHistory();

  const [CPFValueFormatted, setCPFValueFormatted] = useState("");
  const [CPFError, setCPFError] = useState("");

  const goToNewAdmissionPage = () => {
    history.push(routes.newUser);
  };

  const validateCPFAndSearch = (CPFNumbers: string) => {
    if (validateCPF(CPFNumbers)) {
      setCPFError("");
      setCPFValueForSearch(CPFNumbers);
      refetchRegistrations();
    } else setCPFError("CPF Inválido");
  };

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedCPF = applyCPFMask(e.target.value);
    const CPFNumbers = getCPFNumbers(formattedCPF);

    setCPFValueFormatted(formattedCPF);
    validateCPFAndSearch(CPFNumbers);
  };

  const handleRefetchRegistrations = () => {
    setCPFError("");
    setCPFValueFormatted("");
    setCPFValueForSearch("");
    refetchRegistrations();
  };

  return (
    <S.Container>
      <TextField
        placeholder="Digite um CPF válido"
        maxLength={14}
        error={CPFError}
        value={CPFValueFormatted}
        onChange={handleCPFChange}
        name="cpf"
      />
      <S.Actions>
        <IconButton
          aria-label="Atualizar registros"
          onClick={handleRefetchRegistrations}
        >
          <HiRefresh />
        </IconButton>
        <Button onClick={() => goToNewAdmissionPage()}>Nova Admissão</Button>
      </S.Actions>
    </S.Container>
  );
};

export default SearchBar;
