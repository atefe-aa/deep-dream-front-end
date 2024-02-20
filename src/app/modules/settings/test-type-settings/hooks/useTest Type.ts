import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../utils/requestHelpers";

const API_URL = import.meta.env.VITE_APP_API_URL_;
const BASE_URL = `${API_URL}/test-type`;

export function useTestType(id: number) {
  const { data, error, isLoading } = useQuery({
    queryKey: ["testType", id],
    queryFn: () => request("", "Test Type", BASE_URL, undefined, "GET", id),
  });

  const testType = data?.data || [];

  return { error, testType, isLoading };
}
