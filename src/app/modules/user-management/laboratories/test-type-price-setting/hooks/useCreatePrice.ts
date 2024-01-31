import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { PriceModel } from "../../core/_models";
import { postMethodRequest } from "../../../../../utils/requestHelpers";

const API_URL = import.meta.env.VITE_APP_API_URL_;
const BASE_URL = `${API_URL}/price`;

export function useCreatePrice() {
  const queryClient = useQueryClient();
  const {
    mutate: createPrice,
    isPending: isCreating,
    error,
    data,
  } = useMutation({
    mutationFn: (priceData : PriceModel) =>
      postMethodRequest("", "Test Type Price", BASE_URL, priceData),
    onSuccess: () => {
      toast.success("New Test Type Price successfully created.");
      queryClient.invalidateQueries({ queryKey: ["laboratories"] });
    },
    onError: (err) => {
      toast.error(err.message);
      throw new Error(err.message);
    },
  });

  return {
    createPrice,
    isCreating,
    error,
    data,
  };
}
