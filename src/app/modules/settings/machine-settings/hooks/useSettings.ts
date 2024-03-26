import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../utils/requestHelpers";

const API_URL = import.meta.env.VITE_APP_API_URL;
const BASE_URL = `${API_URL}/settings`;

export function useSettings(query = "") {
  const { data, error, isLoading } = useQuery({
    queryKey: ["settings", query],
    queryFn: () => request(query, "Settings", BASE_URL, undefined, "GET"),
  });

  const settings = data?.data || [];
  const meta = data?.meta;

  return { error, settings, isLoading, meta };
}
