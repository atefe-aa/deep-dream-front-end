import { useQuery } from "@tanstack/react-query";
import { getTestTypes } from "../core/_requests";

export function useTestTypes(query = "") {
  const { data, error, isLoading } = useQuery({
    queryKey: ["TestTypes", query],
    queryFn: () => getTestTypes(query),
  });

  const testTypes = data?.data || [];
  const meta = data?.meta;

  return { error, testTypes, isLoading, meta };
}
