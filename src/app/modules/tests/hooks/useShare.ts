import { request } from "../../../utils/requestHelpers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const API_URL = import.meta.env.VITE_APP_API_URL;
const BASE_URL = `${API_URL}/share`;

interface SahreData {
  testId: number;
  counsellors: number[];
}

export function useShare() {
  const queryClient = useQueryClient();
  const {
    mutate: share,
    isPending: isSharing,
    error,
    data,
  } = useMutation({
    mutationFn: (shareData: SahreData) =>
      request("", "Shares", BASE_URL, shareData, "POST", undefined),
    onSuccess: () => {
      toast.success(
        "A message via SMS has been sent to the selected counsellors."
      );
      queryClient.invalidateQueries({ queryKey: ["scans"] });
    },
    onError: (err) => {
      toast.error(err.message);
      throw new Error(err.message);
    },
  });

  return {
    share,
    isSharing,
    error,
    data,
  };
}
