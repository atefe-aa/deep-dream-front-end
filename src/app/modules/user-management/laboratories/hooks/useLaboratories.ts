import { useQuery } from "@tanstack/react-query";
import { getMethodRequest } from "../../../../utils/requestHelpers";

const API_URL = import.meta.env.VITE_APP_API_URL;
const BASE_URL = `${API_URL}/laboratory`;

export function useLaboratories(query = "") {
  const { data, error, isLoading } = useQuery({
    queryKey: ["laboratories", query],
    queryFn: () => getMethodRequest(query, "Laboratory", BASE_URL),
  });

  const laboratories = data?.data || [];
  const meta = data?.meta;

  return { error, laboratories, isLoading, meta };
}
