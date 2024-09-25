import { useMutation } from "@tanstack/react-query";

import { createRegistration } from "../services/registration";
import { NewRegistration } from "../types/registrations";

export const useCreateRegistration = (
  onSuccessCallback: () => void,
  onErrorCallback: () => void
) => {
  const { mutate, isPending } = useMutation({
    mutationFn: (registrationData: NewRegistration) =>
      createRegistration(registrationData),
    onSuccess: () => onSuccessCallback(),
    onError: () => onErrorCallback(),
  });

  return {
    createRegistration: mutate,
    isCreateRegistrationLoading: isPending,
  };
};
