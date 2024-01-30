import { customFetch, handleRequestErrors } from "../../../utils/requestHelpers";

import { RegistrationRequestModel } from "./_models";

const API_URL = import.meta.env.VITE_APP_API_URL_;

const BASE_URL = `${API_URL}/registration`;

// export async function getRegistration(query = "") {
//   const queryString = query ? `?${query}` : "";

//   const res = await fetch(`${BASE_URL}${queryString}`, {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json",
//     },
//   });
//   const { data, meta, errors } = await res.json();

//   if (errors) {
//     console.error(errors);
//     throw new Error("Registrations could not be found.");
//   }

//   return { data, meta };
// }

// Using the customFetch in your API calls
// export async function getRegistration(query = "") {
//   const queryString = query ? `?${query}` : "";
//   const res = await customFetch(`${BASE_URL}${queryString}`);
//   const { data, meta, errors } = await res.json();

//   if (errors) {
//     console.error(errors);
//     throw new Error("Registrations could not be found.");
//   }

//   return { data, meta };
// }

export async function createRegistration(
  registrationData: RegistrationRequestModel
) {
  try {
    const res = await customFetch(BASE_URL, {
      method: "POST",
      body: JSON.stringify(registrationData),
    });

    const { data } = await res.json();
    return { data };
  } catch (e: unknown) {
    console.error((e as Error).message, e);
    throw e;
  }
}

// export async function createRegistration(
//   registrationData: RegistrationRequestModel
// ) {
//   try {
//     const res = await fetch(BASE_URL, {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "content-type": "application/json",
//       },
//       body: JSON.stringify(registrationData),
//     });

//     if (!res.ok) {
//       await handleRequestErrors(res);
//     }

//     const { data } = await res.json();
//     return { data };
//   } catch (e: unknown) {
//     console.error((e as Error).message, e);
//     throw e;
//   }
// }

// export async function deleteRegistration(labId: number) {
//   try {
//     const res = await fetch(`${BASE_URL}/${labId}`, {
//       method: "DELETE",
//       headers: {
//         Accept: "application/json",
//       },
//     });

//     if (!res.ok) {
//       await handleRequestErrors(res);
//     }

//     const { data } = await res.json();
//     return { data };
//   } catch (e: unknown) {
//     console.error((e as Error).message, e);
//     throw e;
//   }
// }

// export async function editRegistrationInfo(labId: number, labData: LabsModel) {
//   try {
//     const res = await fetch(`${BASE_URL}/${labId}`, {
//       method: "PUT",
//       headers: {
//         Accept: "application/json",
//         "Content-type": "application/json",
//       },
//       body: JSON.stringify(labData),
//     });

//     if (!res.ok) {
//       await handleRequestErrors(res);
//     }

//     const { data } = await res.json();
//     return { data };
//   } catch (e: unknown) {
//     console.error((e as Error).message, e);
//     throw e;
//   }
// }

// export async function editRegistrationMedia(labId: number, labData: LabsModel) {
//   const formData = new FormData();
//   Object.entries(labData).forEach(([key, value]) => {
//     if (value !== undefined) {
//       formData.append(key, value);
//     }
//   });
//   try {
//     const res = await fetch(`${BASE_URL}/${labId}`, {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//       },
//       body: formData,
//     });

//     if (!res.ok) {
//       await handleRequestErrors(res);
//     }

//     const { data } = await res.json();
//     return { data };
//   } catch (e: unknown) {
//     console.error((e as Error).message, e);
//     throw e;
//   }
// }