import { ButtonSmall } from "../../../../components/Buttons";
import * as S from "./styles";
import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineTrash,
} from "react-icons/hi";
import { Registration } from "../../../../types/registrations";
import {
  REGISTRATION_STATUS,
  REGISTRATION_STATUS_MAPPER_CONFIRMATION,
} from "../../constants";
import { useDeleteRegistrationMutation } from "../../../../hooks/useDeleteRegistration";
import { useUpdateRegistrationStatus } from "../../../../hooks/useUpdateRegistrationStatus";
import { ConfirmationModal } from "../../../../components/ConfirmationModal";
import { useState } from "react";
import { IconButton } from "../../../../components/Buttons/IconButton";

type Props = {
  handleSnackbarFeedback: (message: string, severity: string) => void;
  refetchRegistrations: () => void;
  data: Registration;
};

const RegistrationCard = (props: Props) => {
  const { refetchRegistrations, handleSnackbarFeedback, data } = props;

  const shouldShowReviewButton =
    data.status === REGISTRATION_STATUS.REPROVED ||
    data.status === REGISTRATION_STATUS.APPROVED;

  const shouldShowReproveAndApproveButtons =
    data.status === REGISTRATION_STATUS.REVIEW;

  const [isLoadingState, setIsLoadingState] = useState(false);

  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [confirmationModalProps, setConfirmationModalProps] = useState({
    title: "",
    description: "",
    onConfirm: () => {},
    onClose: () => setIsConfirmationModalOpen(false),
  });

  const onDeleteSuccessCallback = () => {
    setIsLoadingState(false);
    confirmationModalProps.onClose();
    handleSnackbarFeedback("Cadastro excluído com sucesso", "success");
    refetchRegistrations();
  };

  const onDeleteErrorCallback = () =>
    handleSnackbarFeedback(
      "Erro ao excluir cadastro. Por favor, tente novamente.",
      "error"
    );

  const onUpdateSuccessCallback = () => {
    setIsLoadingState(false);
    confirmationModalProps.onClose();
    handleSnackbarFeedback("Cadastro atualizado com sucesso", "success");
    refetchRegistrations();
  };

  const onUpdateErrorCallback = () =>
    handleSnackbarFeedback(
      "Erro ao atualizar cadastro. Por favor, tente novamente.",
      "error"
    );

  const { deleteRegistration } = useDeleteRegistrationMutation(
    onDeleteSuccessCallback,
    onDeleteErrorCallback
  );

  const { updateRegistrationStatus } = useUpdateRegistrationStatus(
    onUpdateSuccessCallback,
    onUpdateErrorCallback
  );

  const handleDeleteRegistration = () => {
    setConfirmationModalProps({
      ...confirmationModalProps,
      title: "Excluir cadastro",
      description: "Tem certeza que deseja excluir este cadastro?",
      onConfirm: () => {
        setIsLoadingState(true);
        deleteRegistration(data.id);
      },
    });
    setIsConfirmationModalOpen(true);
  };

  const handleUpdateRegistration = (status: REGISTRATION_STATUS) => {
    const mappedStatus = REGISTRATION_STATUS_MAPPER_CONFIRMATION[status];

    setConfirmationModalProps({
      ...confirmationModalProps,
      title: "Atualizar cadastro",
      description: `Tem certeza que deseja ${mappedStatus} este cadastro?`,
      onConfirm: () => {
        setIsLoadingState(true);
        updateRegistrationStatus({
          registration: props.data,
          status,
        });
      },
    });
    setIsConfirmationModalOpen(true);
  };

  return (
    <>
      <S.Card data-testid={`registration-card-${data.status}`}>
        <S.IconAndText>
          <HiOutlineUser />
          <h3>{data.employeeName}</h3>
        </S.IconAndText>
        <S.IconAndText>
          <HiOutlineMail />
          <p>{data.email}</p>
        </S.IconAndText>
        <S.IconAndText>
          <HiOutlineCalendar />
          <span>{data.admissionDate}</span>
        </S.IconAndText>
        <S.ActionBar>
          <S.ActionBarButtons>
            {shouldShowReproveAndApproveButtons ? (
              <>
                <ButtonSmall
                  name="Reprovar"
                  bgcolor="rgb(255, 145, 154)"
                  onClick={() =>
                    handleUpdateRegistration(REGISTRATION_STATUS.REPROVED)
                  }
                >
                  Reprovar
                </ButtonSmall>
                <ButtonSmall
                  name="Aprovar"
                  bgcolor="rgb(155, 229, 155)"
                  onClick={() =>
                    handleUpdateRegistration(REGISTRATION_STATUS.APPROVED)
                  }
                >
                  Aprovar
                </ButtonSmall>
              </>
            ) : null}

            {shouldShowReviewButton ? (
              <ButtonSmall
                name="Revisar"
                bgcolor="#ff8858"
                onClick={() =>
                  handleUpdateRegistration(REGISTRATION_STATUS.REVIEW)
                }
              >
                Revisar novamente
              </ButtonSmall>
            ) : null}
          </S.ActionBarButtons>

          <IconButton
            aria-label="Excluir registro"
            onClick={handleDeleteRegistration}
          >
            <HiOutlineTrash size={25} />
          </IconButton>
        </S.ActionBar>
      </S.Card>

      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        isLoading={isLoadingState}
        {...confirmationModalProps}
      />
    </>
  );
};

export default RegistrationCard;
