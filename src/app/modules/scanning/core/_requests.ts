

const API_URL = import.meta.env.VITE_MACHINE_API_URL;

const BASE_URL = `${API_URL}/test`;

export async function startScanning() {
  const res = await fetch(BASE_URL , {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });
  const { data, errors } = await res.json();

  if (errors) {
    console.error(errors);
    throw new Error("Registrations could not be found.");
  }

  return { data };
}