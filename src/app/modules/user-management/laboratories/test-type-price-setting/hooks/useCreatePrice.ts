import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { PriceModel } from "../../core/_models";
import { postMethodRequest } from "../../../../../utils/requestHelpers";

const API_URL = import.meta.env.VITE_APP_API_URL;
const BASE_URL = `${API_URL}/price`;

export function useCreatePrice(labId: number) {
  const queryClient = useQueryClient();
  const {
    mutate: createPrice,
    isPending: isCreating,
    error,
    data,
  } = useMutation({
    mutationFn: (priceData: PriceModel) =>
      postMethodRequest("", "Price", BASE_URL, priceData),
    onSuccess: () => {
      toast.success("New Price successfully created.");
      queryClient.invalidateQueries({ queryKey: ["laboratories"] });
      queryClient.invalidateQueries({
        queryKey: [
          "testTypes",
          `laboratory=${labId}&noPaginate=true&noPrice=true`,
        ],
      });
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
