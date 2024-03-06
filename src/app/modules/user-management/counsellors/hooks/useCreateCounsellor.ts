import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { postMethodRequest } from "../../../../utils/requestHelpers";
import { CounsellorModel } from "../core/_models";

const API_URL = import.meta.env.VITE_APP_API_URL_;
const BASE_URL = `${API_URL}/counsellor`;

export function useCreateCounsellor() {
  const queryClient = useQueryClient();
  const {
    mutate: createCounsellor,
    isPending: isCreating,
    error,
    data,
  } = useMutation({
    mutationFn: (counsellorData: CounsellorModel) =>
      postMethodRequest("", "Counsellor", BASE_URL, counsellorData),
    onSuccess: () => {
      toast.success("New counsellor successfully created.");
      queryClient.invalidateQueries({ queryKey: ["counsellors"] });
    },
    onError: (err) => {
      toast.error(err.message);
      throw new Error(err.message);
    },
  });

  return {
    createCounsellor,
    isCreating,
    error,
    data,
  };
}
