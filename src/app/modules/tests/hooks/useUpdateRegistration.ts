import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { RegistrationRequestModel, TestsModel } from "../core/_models";
import { request } from "../../../utils/requestHelpers";
const API_URL = import.meta.env.VITE_APP_API_URL_;
const BASE_URL = `${API_URL}/registration`;

export function useUpdateRegistration(id: number) {
  const queryClient = useQueryClient();
  const {
    data,
    mutate: updateRegistration,
    isPending: isUpdating,
    error,
  } = useMutation({
    mutationFn: (RegistrationData: RegistrationRequestModel) =>
      request("", "Patient", BASE_URL, RegistrationData, "PUT", id),
    onSuccess: () => {
      toast.success("Patient successfully updated.");
      queryClient.invalidateQueries({ queryKey: ["registration",id] });
      queryClient.invalidateQueries({ queryKey: ["registrations"] });
    },
    onError: (err) => {
      toast.error(err.message);
      throw new Error(err.message);
    },
  });

  return {
    updateRegistration,
    isUpdating,
    error,
    data,
  };
}
