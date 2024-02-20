import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { request } from "../../../../../utils/requestHelpers";
import { PriceModel } from "../../core/_models";
const API_URL = import.meta.env.VITE_APP_API_URL_;
const BASE_URL = `${API_URL}/price`;

export function useUpdatePrice(id:number) {
  const queryClient = useQueryClient();
  const {
    data,
    mutate: updatePrice,
    isPending: isUpdating,
    error,
  } = useMutation({
    mutationFn: (priceData: PriceModel) =>
      request("", "Price", BASE_URL, priceData, "PUT", id),
    onSuccess: () => {
      toast.success("Price successfully updated.");
      queryClient.invalidateQueries({ queryKey: ["price",id] });
    },
    onError: (err) => {
      toast.error(err.message);
      throw new Error(err.message);
    },
  });

  return {
    updatePrice,
    isUpdating,
    error,
    data,
  };
}
