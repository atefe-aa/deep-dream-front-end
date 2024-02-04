import { useQuery } from "@tanstack/react-query";
import { getMethodRequest } from "../../../utils/requestHelpers";

const API_URL = import.meta.env.VITE_APP_API_URL_;
const BASE_URL = `${API_URL}/scan/slide`;

export function useSlides(query = "") {
  const { data, error, isLoading } = useQuery({
    queryKey: ["slides", query],
    queryFn: () => getMethodRequest(query, "Slides", BASE_URL),
  });

  const slides = data?.data || [];
  const meta = data?.meta;

  return { error, slides, isLoading, meta };
}
