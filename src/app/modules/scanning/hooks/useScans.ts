import { useQuery } from "@tanstack/react-query";
import { getMethodRequest } from "../../../utils/requestHelpers";

const API_URL = import.meta.env.VITE_APP_API_URL;
const BASE_URL = `${API_URL}/scan/processing`;

export function useScans() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["scans"],
    queryFn: () => getMethodRequest("", "Scans", BASE_URL),
  });

  const scans = data?.data || [];
  const meta = data?.meta;

  return { error, scans, isLoading, meta };
}
