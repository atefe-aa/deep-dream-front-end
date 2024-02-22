import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { request } from "../../../utils/requestHelpers";

const API_URL = import.meta.env.VITE_APP_API_URL_;
const BASE_URL = `${API_URL}/notification/recent`;

export function useGetNotifications(type: "system" | "annotation") {
  const queryClient = useQueryClient();
  const {
    data,
    error,
    isPending,
    mutate: getNotifs,
  } = useMutation({
    mutationFn: (query:string) => request(query, "Link", BASE_URL, undefined, "GET", type,true),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notification", type],
      });
    },
  });
;

  const notifications = data?.data || [];
  const meta = data?.meta || [];

  return { error, notifications, isPending ,getNotifs,meta};
}
