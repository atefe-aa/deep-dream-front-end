import { useQuery } from "@tanstack/react-query";
import { request } from "../../../utils/requestHelpers";

const API_URL = import.meta.env.VITE_APP_API_URL_;
const BASE_URL = `${API_URL}/scan/clear-slots`;

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";


export function useClearSlots() {
  const queryClient = useQueryClient();
  const {
    mutate: clearSlots,
    isPending: isClearing,
    error,
    data,
  } = useMutation({
    mutationFn: () => request('','Slots',BASE_URL,undefined,'GET',undefined),
    onSuccess: () => {
      toast.success("Slots are clear now.");
      queryClient.invalidateQueries({ queryKey: ["scans"] });
    },
    onError: (err) => {
      toast.error(err.message);
      throw new Error(err.message);
    },
  });

  return {
    clearSlots,
    isClearing,
    error,
    data,
  };
}
