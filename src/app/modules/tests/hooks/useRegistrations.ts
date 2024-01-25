import { useQuery } from "@tanstack/react-query";
import { getRegistration } from "../core/_requests";

export function useRegistration(query = "") {
  const { data, error, isLoading } = useQuery({
    queryKey: ["Registration", query], // Include the query in the queryKey for cache differentiation
    queryFn: () => getRegistration(query),
  });

  const registrations = data?.data || [];
  const meta = data?.meta;

  return { error, registrations, isLoading, meta };
}
