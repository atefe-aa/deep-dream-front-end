import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createRegistration as createRegistrationApi } from "../core/_requests";

export function useCreateRegistration() {
  const queryClient = useQueryClient();
  const {
    mutate: createRegistration,
    isPending: isCreating,
    error,
    data
  } = useMutation({
    mutationFn: createRegistrationApi,
    onSuccess: () => {
      toast.success("New Registration successfully created.");
      queryClient.invalidateQueries({ queryKey: ["registrations"] });
    },
    onError: (err) => {
      toast.error(err.message);
      throw new Error(err.message);
    },
  });

  return {
    createRegistration,
    isCreating,
    error,
    data
  };
}
