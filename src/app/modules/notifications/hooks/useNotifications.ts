import { useQuery } from "@tanstack/react-query";
import { getMethodRequest, request } from "../../../utils/requestHelpers";

const API_URL = import.meta.env.VITE_APP_API_URL_;


export function useNotifications(type: "system" | "annotation", query = "") {
  const BASE_URL = `${API_URL}/notification/recent/${type}`;
  const { data, error, isLoading } = useQuery({
    queryKey: ["notification", type, query],
    queryFn: () => getMethodRequest(query, "Link", BASE_URL),
  });


  const notifications = data?.data || [];
  const meta = data?.meta || [];

  return { error, notifications, isLoading,meta };
}
