import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-hot-toast";
import { request } from "../../../../../utils/requestHelpers";

const API_URL = import.meta.env.VITE_APP_API_URL;
const BASE_URL = `${API_URL}/price`;
export function useDeletePrice() {
  const queryClient = useQueryClient();
  const {
    mutate: deletePrice,
    isPending: isDeleting,
    error,
  } = useMutation({
    mutationFn: (id: number) =>
      request("", "Price", BASE_URL, "", "DELETE", id),
    onSuccess: () => {
      toast.success("Test Type successfully deleted.");
      queryClient.invalidateQueries({ queryKey: ["laboratories"] });
    },
    onError: (err) => {
      toast.error(err.message);
      throw new Error(err.message);
    },
  });

  return {
    deletePrice,
    isDeleting,
    error,
  };
}
