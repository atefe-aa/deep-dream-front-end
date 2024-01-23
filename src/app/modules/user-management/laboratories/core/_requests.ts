import { handleRequestErrors } from "../../../../utils/requestHelpers";
import { LabDataModel, LabsModel } from "./_models";

const API_URL = import.meta.env.VITE_APP_API_URL_;

const BASE_URL = `${API_URL}/laboratory`;

export async function getLaboratories() {
  const res = await fetch(BASE_URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  const { data, errors } = await res.json();

  if (errors) {
    console.error(errors);
    throw new Error("Laboratories could not be found.");
  }

  return data;
}

export async function createLaboratory(labData: LabDataModel) {
  const formData = new FormData();
  Object.entries(labData).forEach(([key, value]) => {
    if (value !== undefined) {
      formData.append(key, value);
    }
  });

  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
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


export async function deleteLaboratory(labId: number) {

  try {
    const res = await fetch(`${BASE_URL}/${labId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
      }
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

export async function editLaboratoryInfo(  labId: number, labData:LabsModel) {

  try {
    const res = await fetch(`${BASE_URL}/${labId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json"
      },
      body: JSON.stringify(labData)
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


export async function editLaboratoryMedia(  labId: number, labData:LabsModel) {
  const formData = new FormData();
  Object.entries(labData).forEach(([key, value]) => {
    if (value !== undefined) {
      formData.append(key, value);
    }
  });
  try {
    const res = await fetch(`${BASE_URL}/${labId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData
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
