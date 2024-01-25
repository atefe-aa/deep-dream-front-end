import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { editLaboratoryMedia as editLaboratoryMediaApi } from "../core/_requests";

type Data = { data: any };
type Error = { message: string };

export function useUpdateMedia() {
  const queryClient = useQueryClient();
  const {
    mutate: updateMedia,
    isPending,
    error,
  } = useMutation<Data, Error, [id: number, data: any]>({
    mutationFn: ([id, data]) => editLaboratoryMediaApi(id, data),
    onSuccess: () => {
      toast.success("Laboratory media successfully updated.");
      queryClient.invalidateQueries({ queryKey: ["laboratories"] });
    },
    onError: (err) => {
      toast.error(err.message);
      throw new Error(err.message);
    },
  });

  return {
    updateMedia,
    isPending,
    error,
  };
}
