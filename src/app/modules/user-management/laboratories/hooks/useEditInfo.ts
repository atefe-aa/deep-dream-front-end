import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { editLaboratoryInfo as editLaboratoryInfoApi } from "../core/_requests";

type Data ={data: any}
type Error ={message: string}

export function useEditInfo() {
  const queryClient = useQueryClient();
  const {
    data,
    mutate: editLaboratoryInfo,
    isPending,
    error,
  } = useMutation<Data, Error, [id:number, data:any]>({
    mutationFn:([id,data])=> editLaboratoryInfoApi(id, data),
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
    data
  };
}
