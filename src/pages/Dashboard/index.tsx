import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import Collumns from "./components/Columns";
import * as S from "./styles";
import { SearchBar } from "./components/Searchbar";
import { useGetRegistrations } from "../../hooks/useGetRegistrations";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { getInitialSnackbarProps } from "./constants";

export interface RegistrationState {
  registration: string;
}

const DashboardPage = () => {
  const { state } = useLocation();
  const registrationState = state as RegistrationState;

  const initialSnackbarProps = getInitialSnackbarProps(registrationState);

  const [snackbarProps, setSnackbarProps] = useState(initialSnackbarProps);
  const [CPFValueForSearch, setCPFValueForSearch] = useState("");

  const { registrations, isRegistrationsLoading, refetchRegistrations } =
    useGetRegistrations(CPFValueForSearch);

  const handleSnackbarFeedback = (message: string, severity: string) => {
    setSnackbarProps({
      open: true,
      message,
      severity,
    });
  };

  return (
    <S.Container>
      <SearchBar
        refetchRegistrations={refetchRegistrations}
        setCPFValueForSearch={setCPFValueForSearch}
      />

      <Collumns
        handleSnackbarFeedback={handleSnackbarFeedback}
        refetchRegistrations={refetchRegistrations}
        registrations={registrations}
        isRegistrationsLoading={isRegistrationsLoading}
      />

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={5000}
        open={snackbarProps.open}
        onClose={() => setSnackbarProps({ ...snackbarProps, open: false })}
      >
        <Alert
          severity={snackbarProps.severity === "success" ? "success" : "error"}
          variant="filled"
        >
          {snackbarProps.message}
        </Alert>
      </Snackbar>
    </S.Container>
  );
};
export default DashboardPage;
