import { useQuery } from "@tanstack/react-query";
import { request } from "../../../utils/requestHelpers";

const API_URL = import.meta.env.VITE_APP_API_URL;

export function useChart({ query = "", chart = "chart" }) {
  const BASE_URL = `${API_URL}/statistics/${chart}`;

  const { data, error, isLoading } = useQuery({
    queryKey: ["chart", query, chart],
    queryFn: () => request(query, "Chart Data", BASE_URL, undefined, "GET"),
  });

  const chartData = data?.data || [];

  return { error, chartData, isLoading };
}
