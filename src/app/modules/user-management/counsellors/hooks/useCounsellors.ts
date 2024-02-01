import { useQuery } from "@tanstack/react-query";
import { getMethodRequest } from "../../../../utils/requestHelpers";

const API_URL = import.meta.env.VITE_APP_API_URL_;
const BASE_URL = `${API_URL}/counsellor`;

export function useCounsellors(query = "") {
  const { data, error, isLoading } = useQuery({
    queryKey: ["counsellors", query],
    queryFn: () => getMethodRequest(query, "Counsellor", BASE_URL),
  });

  const counsellors = data?.data || [];
  const meta = data?.meta;

  return { error, counsellors, isLoading, meta };
}
