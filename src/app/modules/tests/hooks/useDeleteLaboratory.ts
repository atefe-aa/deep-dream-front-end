import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteLaboratory as deleteLaboratoryApi } from "../core/_requests";

export function useDeleteLaboratory() {
  const queryClient = useQueryClient();
  const {
    mutate: deleteLaboratory,
    isPending: isDeleting,
    error,
  } = useMutation({
    mutationFn: deleteLaboratoryApi,
    onSuccess: () => {
      toast.success("Laboratory successfully deleted.");
      queryClient.invalidateQueries({ queryKey: ["laboratories"] });
    },
    onError: (err) => {
      toast.error(err.message);
      throw new Error(err.message);
    },
  });

  return {
    deleteLaboratory,
    isDeleting,
    error,
  };
}
