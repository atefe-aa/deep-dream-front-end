import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { request } from "../../../../utils/requestHelpers";
import { CounsellorModel } from "../core/_models";
const API_URL = import.meta.env.VITE_APP_API_URL;
const BASE_URL = `${API_URL}/counsellor`;

export function useUpdateCounsellor() {
  const queryClient = useQueryClient();
  const {
    data,
    mutate: updateCounsellor,
    isPending: isUpdating,
    error,
  } = useMutation({
    mutationFn: (counsellorData: CounsellorModel) =>
      request(
        "",
        "Counsellor",
        BASE_URL,
        counsellorData,
        "PUT",
        counsellorData.id
      ),
    onSuccess: () => {
      toast.success("Counsellor successfully updated.");
      queryClient.invalidateQueries({ queryKey: ["counsellors"] });
    },
    onError: (err) => {
      toast.error(err.message);
      throw new Error(err.message);
    },
  });

  return {
    updateCounsellor,
    isUpdating,
    error,
    data,
  };
}
