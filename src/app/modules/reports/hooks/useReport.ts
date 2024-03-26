import { useQuery } from "@tanstack/react-query";
import { getMethodRequest, request } from "../../../utils/requestHelpers";

const API_URL = import.meta.env.VITE_APP_API_URL;
const BASE_URL = `${API_URL}/report`;

export function useReport(testId: number) {
  const { data, error, isLoading } = useQuery({
    queryKey: ["report", testId],
    queryFn: () => request("", "Report", BASE_URL, undefined, "GET", testId),
  });

  const report = data?.data || [];

  return { error, report, isLoading };
}
