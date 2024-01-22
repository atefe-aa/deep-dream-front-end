import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createLaboratory as createLaboratoryApi } from "../core/_requests";

export function useCreateLaboratory() {
  const queryClient = useQueryClient();
  const {
    mutate: createLaboratory,
    isPending: isCreating,
    error,
  } = useMutation({
    mutationFn: createLaboratoryApi,
    onSuccess: () => {
      toast.success("New Laboratory successfully created.");
      queryClient.invalidateQueries({ queryKey: ["laboratories"] });
    },
    onError: (err) => {
      toast.error(err.message);
      throw new Error(err.message);
    },
  });

  return {
    createLaboratory,
    isCreating,
    error,
  };
}
