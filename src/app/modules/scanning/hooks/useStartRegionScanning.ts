import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { postMethodRequest } from "../../../utils/requestHelpers";
import { SelectedRegion } from "../../../pages/scanning/ScanningPage";

const API_URL = import.meta.env.VITE_APP_API_URL_;
const BASE_URL = `${API_URL}/scan/region`;

export function useStartRegionScanning() {
  const queryClient = useQueryClient();
  const {
    mutate: startRegionScanning,
    isPending: isStarting,
    error,
    data,
  } = useMutation({
    mutationFn: (selectedRegions: SelectedRegion[]) =>
      postMethodRequest("", "Scanning", BASE_URL, {selectedRegions}),
    onSuccess: () => {
      toast.success("Scanning started.");
      queryClient.invalidateQueries({ queryKey: ["slides"] });
    },
    onError: (err) => {
      toast.error(err.message);
      throw new Error(err.message);
    },
  });

  return {
    startRegionScanning,
    isStarting,
    error,
    data,
  };
}
