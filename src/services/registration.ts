import axios from "axios";
import { REGISTRATION_STATUS } from "../pages/Dashboard/constants";
import { NewRegistration, Registration } from "../types/registrations";

const registrationsApi = axios.create({
  baseURL: "https://boiled-aluminum-circle.glitch.me/registrations",
});

export async function getRegistrations(CPF: string) {
  const queryParams = CPF !== "" ? `?cpf=${CPF}` : "";

  await new Promise((resolve) => setTimeout(resolve, 1000));

  const response = await registrationsApi.get(queryParams);

  return response.data;
}

export async function deleteRegistration(registrationId: string) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const response = await registrationsApi.delete("/" + registrationId);

  return response.data;
}

export async function updateRegistrationStatus(
  registration: Registration,
  status: REGISTRATION_STATUS
) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const response = await registrationsApi.put("/" + registration.id, {
    ...registration,
    status,
  });

  return response.data;
}

export async function createRegistration(registration: NewRegistration) {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const response = await registrationsApi.post("/", registration);

  return response.data;
}
