import { useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "../../../utils/requestHelpers";

const API_URL = import.meta.env.VITE_APP_API_URL_;
const BASE_URL = `${API_URL}/notification/recent`;

export function useNotifications(query: string) {
  const queryClient = useQueryClient();
  const {
    data,
    mutate: getNotifications,
    isPending,
    error,
  } = useMutation({
    mutationFn: (type: string) =>
      request(query, "Notifications", BASE_URL, undefined, "GET", type),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: (err) => {
      throw new Error(err.message);
    },
  });
  const notifications = data?.data || [] ;
  return {
    getNotifications,
    isPending,
    error,
    notifications,
  };
}
