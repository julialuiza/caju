import { useMutation } from "@tanstack/react-query";
import { REGISTRATION_STATUS } from "../pages/Dashboard/constants";

import { updateRegistrationStatus } from "../services/registration";
import { Registration } from "../types/registrations";

interface UpdateRegistrationStatusData {
  registration: Registration;
  status: REGISTRATION_STATUS;
}

export const useUpdateRegistrationStatus = (
  onUpdateSuccessCallback: () => void,
  onUpdateErrorCallback: () => void
) => {
  const { mutate, isPending } = useMutation({
    mutationFn: ({ registration, status }: UpdateRegistrationStatusData) =>
      updateRegistrationStatus(registration, status),
    onSuccess: () => onUpdateSuccessCallback(),
    onError: () => onUpdateErrorCallback(),
  });

  return {
    updateRegistrationStatus: mutate,
    isUpdateLoading: isPending,
  };
};
