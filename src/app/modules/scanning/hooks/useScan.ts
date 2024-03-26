import { useQuery } from "@tanstack/react-query";
import { getMethodRequest } from "../../../utils/requestHelpers";

const API_URL = import.meta.env.VITE_APP_API_URL;
const BASE_URL = `${API_URL}/scan`;

export function useScan(nthSlide: number) {
  const { data, error, isLoading } = useQuery({
    queryKey: ["scan", nthSlide],
    queryFn: () => getMethodRequest("", "Scan", `${BASE_URL}/${nthSlide}`),
  });

  const scan = data?.data || [];
  const meta = data?.meta;

  return { error, scan, isLoading, meta };
}
