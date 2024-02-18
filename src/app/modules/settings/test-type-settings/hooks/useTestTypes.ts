import { useQuery } from "@tanstack/react-query";
import { getMethodRequest } from "../../../../utils/requestHelpers";

const API_URL = import.meta.env.VITE_APP_API_URL_;
const BASE_URL = `${API_URL}/test-type`;

export function useTestTypes(query = "") {
  const { data, error, isLoading } = useQuery({
    queryKey: ["testTypes", query],
    queryFn: () => getMethodRequest(query, 'Test Type',BASE_URL),
  });

  const testTypes = data?.data || [];
  const meta = data?.meta;

  return { error, testTypes, isLoading, meta };
}
