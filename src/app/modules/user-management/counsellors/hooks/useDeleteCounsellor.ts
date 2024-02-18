import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { request } from "../../../../utils/requestHelpers";
const API_URL = import.meta.env.VITE_APP_API_URL_;
const BASE_URL = `${API_URL}/counsellor`;
export function useDeleteCounsellor() {
  const queryClient = useQueryClient();
  const {
    mutate: deleteCounsellor,
    isPending: isDeleting,
    error,
  } = useMutation({
    mutationFn: (id: number) =>
      request("", "Counsellor", BASE_URL, "", "DELETE", id),
    onSuccess: () => {
      toast.success("Counsellor successfully deleted.");
      queryClient.invalidateQueries({ queryKey: ["counsellors"] });
    },
    onError: (err) => {
      toast.error(err.message);
      throw new Error(err.message);
    },
  });

  return {
    deleteCounsellor,
    isDeleting,
    error,
  };
}
