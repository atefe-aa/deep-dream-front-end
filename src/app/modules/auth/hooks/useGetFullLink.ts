import { useQuery } from "@tanstack/react-query";
import { request } from "../../../utils/requestHelpers";

const API_URL = import.meta.env.VITE_APP_API_URL;
const BASE_URL = `${API_URL}/link`;

export function useGetLink(code: string) {
  const { data, error, isLoading } = useQuery({
    queryKey: ["link", code],
    queryFn: () => request("", "Link", BASE_URL, undefined, "GET", code),
  });

  const link = data?.data || "";

  return { error, link, isLoading };
}
