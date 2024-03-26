import { useQuery } from "@tanstack/react-query";
import { getMethodRequest, request } from "../../../utils/requestHelpers";

const API_URL = import.meta.env.VITE_APP_API_URL;
const BASE_URL = `${API_URL}/report`;

export function useReportTemplates() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["reports"],
    queryFn: () => request("", "Reports", BASE_URL, undefined, "GET"),
  });

  const reports = data?.data || [];

  return { error, reports, isLoading };
}
