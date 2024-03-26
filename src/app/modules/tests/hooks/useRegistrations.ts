import { useQuery } from "@tanstack/react-query";
import { getMethodRequest } from "../../../utils/requestHelpers";

const API_URL = import.meta.env.VITE_APP_API_URL;
const BASE_URL = `${API_URL}/registration`;

export function useRegistrations(query = "") {
  const { data, error, isLoading } = useQuery({
    queryKey: ["registrations", query], // Include the query in the queryKey for cache differentiation
    queryFn: () => getMethodRequest(query, "Patient", BASE_URL),
  });

  const registrations = data?.data || [];
  const meta = data?.meta;

  return { error, registrations, isLoading, meta };
}
