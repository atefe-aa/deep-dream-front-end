import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { request } from "../../../utils/requestHelpers";

const API_URL = import.meta.env.VITE_APP_API_URL;
const BASE_URL = `${API_URL}/scan/addTestId`;

interface dataModel {
  testId: number;
  slideNumber: number;
  id: number;
}
export function useUpdateScan(nthSlide: number) {
  const queryClient = useQueryClient();
  const {
    mutate: updateScan,
    isPending: isUpdating,
    error,
    data,
  } = useMutation({
    mutationFn: (itemData: dataModel) => {
      return request(
        "",
        "Scan",
        BASE_URL,
        { testId: itemData.testId, slideNumber: itemData.slideNumber },
        "POST",
        itemData.id
      );
    },
    onSuccess: () => {
      toast.success("Scan's updated.");
      queryClient.invalidateQueries({ queryKey: ["scans"] });
    },
    onError: (err) => {
      toast.error(err.message);
      throw new Error(err.message);
    },
  });

  return {
    updateScan,
    isUpdating,
    error,
    data,
  };
}
