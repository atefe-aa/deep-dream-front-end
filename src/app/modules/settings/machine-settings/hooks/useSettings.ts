import { useQuery } from "@tanstack/react-query";
import { getMethodRequest } from "../../../../utils/requestHelpers";

const API_URL = import.meta.env.VITE_APP_API_URL_;
const BASE_URL = `${API_URL}/settings`;

export function useSettings(query = "") {
  const { data, error, isLoading } = useQuery({
    queryKey: ["settings", query],
    queryFn: () => getMethodRequest(query, 'Settings',BASE_URL),
  });

  const settings = data?.data || [];
  const meta = data?.meta;

  return { error, settings, isLoading, meta };
}
