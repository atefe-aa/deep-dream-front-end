import { useQuery } from "@tanstack/react-query";
import { request } from "../../../utils/requestHelpers";

const API_URL = import.meta.env.VITE_APP_API_URL;
const BASE_URL = `${API_URL}/notification/is-new`;

export function useCheckNotifications(query = "") {
  const { data, error, isLoading } = useQuery({
    queryKey: ["is-new", query],
    queryFn: () => request(query, "Notifications", BASE_URL, undefined, "GET"),
  });

  const isNew = data?.data.isNew || false;
  return { error, isNew, isLoading };
}
