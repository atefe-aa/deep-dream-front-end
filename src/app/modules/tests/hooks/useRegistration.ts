import { useQuery } from "@tanstack/react-query";
import { request } from "../../../utils/requestHelpers";

const API_URL = import.meta.env.VITE_APP_API_URL_;
const BASE_URL = `${API_URL}/registration`;

export function useRegistration(id:number) {
  const { data, error, isLoading } = useQuery({
    queryKey: ["registration", id],
    queryFn: () => request("", "Registration", BASE_URL,undefined,"GET",id),
  });

  const registration = data?.data || [];


  return { error, registration, isLoading };
}
