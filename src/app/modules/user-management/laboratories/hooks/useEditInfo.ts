import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { editLaboratoryInfo as editLaboratoryInfoApi } from "../core/_requests";
import { request } from "../../../../utils/requestHelpers";

const API_URL = import.meta.env.VITE_APP_API_URL_;

const BASE_URL = `${API_URL}/laboratory`;

type Data = { data: any };
type Error = { message: string };

export function useEditInfo() {
  const queryClient = useQueryClient();
  const {
    data,
    mutate: editLaboratoryInfo,
    isPending,
    error,
  } = useMutation<Data, Error, [id: number, data: any]>({
    // mutationFn:([id,data])=> editLaboratoryInfoApi(id, data),
    mutationFn: ([id, data]) =>
      request("", "Laboratory", BASE_URL, data, "PUT", id),
    onSuccess: () => {
      toast.success("Laboratory successfully updated.");
      queryClient.invalidateQueries({ queryKey: ["laboratories"] });
    },
    onError: (err) => {
      toast.error(err.message);
      throw new Error(err.message);
    },
  });

  return {
    editLaboratoryInfo,
    isPending,
    error,
    data,
  };
}
