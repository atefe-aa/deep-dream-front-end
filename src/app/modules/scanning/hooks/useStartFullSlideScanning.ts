import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { request } from "../../../utils/requestHelpers";

const API_URL = import.meta.env.VITE_APP_API_URL_;
const BASE_URL = `${API_URL}/scan/full-slide`;

export function useStartFullSlideScanning() {
  const queryClient = useQueryClient();
  const {
    mutate: startFullSlideScanning,
    isPending: isStarting,
    error,
    data,
  } = useMutation({
    mutationFn: (slides: Array<number>) =>
      request("", "Scanning", BASE_URL, {slides},"POST"),
    onSuccess: () => {
      toast.success("Scanning started.");
      queryClient.invalidateQueries({ queryKey: ["scans"] });
    },
    onError: (err) => {
      toast.error(err.message);
      throw new Error(err.message);
    },
  });

  return {
    startFullSlideScanning,
    isStarting,
    error,
    data,
  };
}
