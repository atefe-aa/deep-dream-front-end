
import { request } from "../../../utils/requestHelpers";
import { useQuery } from "react-query";
const API_URL = import.meta.env.VITE_APP_API_URL_;
const BASE_URL = `${API_URL}/cytomine-token`;

export function useGetToken() {

    const { data , error, isLoading } = useQuery({
        queryKey: ["token"],
        queryFn: () => request("", "Token", BASE_URL, undefined, "GET"),
      });
 
  return {
    isLoading,
    error,
    data,
  };
}
