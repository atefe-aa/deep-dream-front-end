import { useQuery } from "@tanstack/react-query";
import { getLaboratories } from "../core/_requests";

export function useLaboratories(query="") {
  const {
    data,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["laboratories", query], // Include the query in the queryKey for cache differentiation
    queryFn: () => getLaboratories(query),
  });

  const laboratories = data?.data || [];
  const meta = data?.meta;

  return { error, laboratories, isLoading, meta };
}
