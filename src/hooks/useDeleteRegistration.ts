import { useMutation } from "@tanstack/react-query";

import { deleteRegistration } from "../services/registration";

export const useDeleteRegistrationMutation = (
  onDeleteSuccessCallback: () => void,
  onDeleteErrorCallback: () => void
) => {
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (registrationId: string) => deleteRegistration(registrationId),
    onSuccess: () => onDeleteSuccessCallback(),
    onError: () => onDeleteErrorCallback(),
  });

  return {
    deleteRegistration: mutate,
    isDeleteLoading: isPending,
    isDeleteSuccess: isSuccess,
  };
};
