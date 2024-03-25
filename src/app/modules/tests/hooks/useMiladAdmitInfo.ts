import { useQuery } from "@tanstack/react-query";
import { getMiladAdmitInfo } from "../core/_requests";
import { MiladAdmitInfo } from "../core/_models";

export function useMiladAdmitInfo(admitNumber: number) {
  const { data, error, isLoading } = useQuery({
    queryKey: ["miladAdmit", admitNumber],
    queryFn: () => getMiladAdmitInfo(admitNumber),
  });

  // Check if data exists and extract it from the object
  const extractedData = data ? data.data : undefined;

  return { error, data: extractedData, isLoading } as { error: any; data: MiladAdmitInfo | undefined; isLoading: boolean };

}
