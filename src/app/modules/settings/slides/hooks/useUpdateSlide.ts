import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { request } from "../../../../utils/requestHelpers";
const API_URL = import.meta.env.VITE_APP_API_URL_;
const BASE_URL = `${API_URL}/scan/slide`;


export function useUpdateSlide() {
  const queryClient = useQueryClient();
  const {
    data,
    mutate: updateSlide,
    isPending: isUpdating,
    error,
  } = useMutation({
    mutationFn: (slideData: SlideModel) => request("", "Slide", BASE_URL, slideData, "PUT",slideData.id),
    onSuccess: () => {
      toast.success("Slide successfully updated.");
      queryClient.invalidateQueries({ queryKey: ["slides"] });
    },
    onError: (err) => {
      toast.error(err.message);
      throw new Error(err.message);
    },
  });

  return {
    updateSlide,
    isUpdating,
    error,
    data
  };
}
