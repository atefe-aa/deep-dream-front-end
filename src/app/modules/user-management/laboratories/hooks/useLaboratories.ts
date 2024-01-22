import { useQuery } from "@tanstack/react-query";
import { getLaboratories } from "../core/_requests";

export function useLaboratories() {
  const {
    data: laboratories,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["laboratories"],
    queryFn: getLaboratories,
  });

  return { error, laboratories, isLoading };
}
