import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../../utils/requestHelpers";

const API_URL = import.meta.env.VITE_APP_API_URL;
const BASE_URL = `${API_URL}/price`;

export function usePrice(id: number) {
  const { data, error, isLoading } = useQuery({
    queryKey: ["price", id],
    queryFn: () => request("", "Price", BASE_URL, undefined, "GET", id),
  });

  const price = data?.data || [];

  return { error, price, isLoading };
}
