import {
  customFetch,
  handleRequestErrors,
} from "../../../utils/requestHelpers";

import { RegistrationRequestModel } from "./_models";

const API_URL = import.meta.env.VITE_APP_API_URL_;

const BASE_URL = `${API_URL}/registration`;

export async function createRegistration(
  registrationData: RegistrationRequestModel
) {
  try {
    const res = await customFetch(BASE_URL, {
      method: "POST",
      body: JSON.stringify(registrationData),
    });
    if (!res.ok) {
      await handleRequestErrors(res);
    }

    const { data } = await res.json();
    return { data };
  } catch (e: unknown) {
    console.error((e as Error).message, e);
    throw e;
  }
}

const PARSIC_URL = import.meta.env.VITE_PARSIC_API_URL;
const MILAD_INFO_URL = `${PARSIC_URL}/slider-patient-info-tests`;
export async function getMiladAdmitInfo(admitNumber: number) {
  try {
    const formData = new URLSearchParams();
    formData.append("id", admitNumber.toString());

    const res = await fetch(MILAD_INFO_URL, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        apikey: "apikey",
      },
    });
    if (!res.ok) {
      await handleRequestErrors(res);
    }

    const { data } = await res.json();
    return { data };
  } catch (e: unknown) {
    console.error((e as Error).message, e);
    throw e;
  }
}
