import { useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "../../../utils/requestHelpers";

const API_URL = import.meta.env.VITE_APP_API_URL;
const BASE_URL = `${API_URL}/notification/read`;

export function useMarkAsRead() {
  const queryClient = useQueryClient();
  const {
    data,
    mutate: markAsRead,
    isPending: isMarking,
    error,
  } = useMutation({
    mutationFn: () =>
      request("", "Notifications", BASE_URL,undefined, "POST"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["is-new"] });
    },
    onError: (err) => {
      throw new Error(err.message);
    },
  });

  return {
    data,
    markAsRead,
    isMarking,
    error,
  };
}
