import {
  getAuthToken,
  handleRequestErrors,
} from "../../../../utils/requestHelpers";
// import { customFetch } from "../../../auth";
import { LabDataModel, LabsModel } from "./_models";

const API_URL = import.meta.env.VITE_APP_API_URL;

const BASE_URL = `${API_URL}/laboratory`;

const authToken = getAuthToken();

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
        Authorization: authToken || "",
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
        Authorization: authToken || "",
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

export async function editLaboratoryInfo(labId: number, labData: LabsModel) {
  try {
    const res = await fetch(`${BASE_URL}/${labId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(labData),
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

export async function editLaboratoryMedia(labId: number, labData: LabsModel) {
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
        Authorization: authToken || "",
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
