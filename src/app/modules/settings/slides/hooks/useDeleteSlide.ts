import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { request } from "../../../../utils/requestHelpers";
const API_URL = import.meta.env.VITE_APP_API_URL_;
const BASE_URL = `${API_URL}/scan/slide`;
export function useDeleteSlide() {
  const queryClient = useQueryClient();
  const {
    mutate: deleteSlide,
    isPending: isDeleting,
    error,
  } = useMutation({
    mutationFn: (id: number) =>
      request("", "Slide", BASE_URL, "", "DELETE", id),
    onSuccess: () => {
      toast.success("Slide successfully deleted.");
      queryClient.invalidateQueries({ queryKey: ["slides"] });
    },
    onError: (err) => {
      toast.error(err.message);
      throw new Error(err.message);
    },
  });

  return {
    deleteSlide,
    isDeleting,
    error,
  };
}
