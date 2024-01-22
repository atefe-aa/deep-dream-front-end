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
  const { data, error } = await res.json();

  if (error) {
    console.error(error);
    throw new Error("Laboratories could not be found.");
  }

  return data;
}

export async function createLaboratory(labData: LabDataModel) {
  const formData = new FormData();
  Object.entries(labData).forEach(([key, value]) => {
    formData.append(key, value);
  });
  console.log(labData);
  console.log(formData);

  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    });

    const { data, success, error } = await res.json();

    if (error) {
      console.error(error);
      throw new Error("Laboratory could not be created.");
    }

    return { data, success, error };
  } catch (e) {
    console.error(e);
    throw new Error("Error creating laboratory.");
  }
}
