import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { request } from "../../../../utils/requestHelpers";
const API_URL = import.meta.env.VITE_APP_API_URL;
const BASE_URL = `${API_URL}/scan/slide`;

export function useCreateSlide() {
  const queryClient = useQueryClient();
  const {
    mutate: createSlide,
    isPending: isCreating,
    data,
    error,
  } = useMutation({
    mutationFn: (values: any) => request("", "Slide", BASE_URL, values, "POST"),
    onSuccess: () => {
      toast.success("Slide successfully added.");
      queryClient.invalidateQueries({ queryKey: ["slides"] });
    },
    onError: (err) => {
      toast.error(err.message);
      throw new Error(err.message);
    },
  });

  return {
    createSlide,
    isCreating,
    error,
    data,
  };
}
