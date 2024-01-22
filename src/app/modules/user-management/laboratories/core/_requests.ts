
const API_URL = import.meta.env.VITE_APP_API_URL_;

const GET_ALL_LABS = `${API_URL}/laboratory`


export async function getLaboratories() {
  
    const res = await fetch(GET_ALL_LABS, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const { data, error } = await res.json();
  
    if (error) {
      console.error(error);
      throw new Error("Cabins could not be found.");
    }
  
    return data;
  }