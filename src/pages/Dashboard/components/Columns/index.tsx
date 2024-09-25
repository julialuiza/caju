import * as S from "./styles";
import RegistrationCard from "../RegistrationCard";
import { Registration } from "../../../../types/registrations";
import { REGISTRATION_STATUS } from "../../constants";
import CollumnsLoading from "./loading";

const allColumns = [
  { status: REGISTRATION_STATUS.REVIEW, title: "Pronto para revisar" },
  { status: REGISTRATION_STATUS.APPROVED, title: "Aprovado" },
  { status: REGISTRATION_STATUS.REPROVED, title: "Reprovado" },
];

type CollumnsProps = {
  handleSnackbarFeedback: (message: string, severity: string) => void;
  refetchRegistrations: () => void;
  registrations?: Registration[];
  isRegistrationsLoading?: boolean;
};

const Collumns = (props: CollumnsProps) => {
  if (props.isRegistrationsLoading) return <CollumnsLoading />;

  return (
    <S.Container>
      {allColumns.map((collum) => {
        return (
          <S.Column status={collum.status} key={collum.title}>
            <>
              <S.TitleColumn status={collum.status}>
                {collum.title}
              </S.TitleColumn>
              <S.CollumContent>
                {props?.registrations?.map((registration) => {
                  return registration.status === collum.status ? (
                    <RegistrationCard
                      handleSnackbarFeedback={props.handleSnackbarFeedback}
                      refetchRegistrations={props.refetchRegistrations}
                      data={registration}
                      key={registration.id}
                    />
                  ) : null;
                })}
              </S.CollumContent>
            </>
          </S.Column>
        );
      })}
    </S.Container>
  );
};
export default Collumns;
