import { useQuery } from "@tanstack/react-query";
import { getRegistrations } from "../services/registration";

export const useGetRegistrations = (CPF: string = "") => {
  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["registrations", CPF],
    queryFn: () => getRegistrations(CPF),
    refetchOnWindowFocus: false,
  });

  return {
    registrations: data,
    isRegistrationsLoading: isLoading || isFetching,
    refetchRegistrations: refetch,
  };
};
