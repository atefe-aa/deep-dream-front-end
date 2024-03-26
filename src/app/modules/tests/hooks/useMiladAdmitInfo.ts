import { useQuery } from "@tanstack/react-query";
import { MiladAdmitInfo } from "../core/_models";
import { request } from "../../../utils/requestHelpers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const API_URL = import.meta.env.VITE_APP_API_URL;
const BASE_URL = `${API_URL}/admit-info`;

export function useMiladAdmitInfo(admitNumber: number) {
  // const { data, error, isLoading } = useQuery({
  //   queryKey: ["miladAdmit", admitNumber],
  //   queryFn: () =>
  //     request("", "Admit", BASE_URL, undefined, "GET", admitNumber),
  // });
  const queryClient = useQueryClient();
  const {
    mutate: getAdmitInfo,
    isPending,
    error,
    data,
  } = useMutation({
    mutationFn: () =>
      request("", "Admit", BASE_URL, undefined, "GET", admitNumber),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admitInfo",admitNumber] });
    },
    onError: (err) => {
      toast.error(err.message);
      throw new Error(err.message);
    },
  });

  const extractedData = data ? data.data : undefined;

  // return { error, data: extractedData, isPending } as {
  //   error: any;
  //   data: MiladAdmitInfo | undefined;
  //   isPending: boolean;
  // };
  return { data: extractedData, isPending, getAdmitInfo };
}
