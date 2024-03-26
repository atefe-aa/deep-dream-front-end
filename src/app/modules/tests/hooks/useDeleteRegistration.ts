import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "react-hot-toast";
import { request } from "../../../utils/requestHelpers";

const API_URL = import.meta.env.VITE_APP_API_URL;
const BASE_URL = `${API_URL}/registration`;
export function useDeleteRegistration() {
  const queryClient = useQueryClient();
  const {
    mutate: deleteRegistration,
    isPending: isDeleting,
    error,
  } = useMutation({
    mutationFn: (id: number) =>
      request("", "Patient", BASE_URL, "", "DELETE", id),
    onSuccess: () => {
      toast.success("Patient successfully deleted.");
      queryClient.invalidateQueries({ queryKey: ["registrations"] });
    },
    onError: (err) => {
      toast.error(err.message);
      throw new Error(err.message);
    },
  });

  return {
    deleteRegistration,
    isDeleting,
    error,
  };
}
