import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { request } from "../../../../utils/requestHelpers";
import { title } from "process";

const API_URL = import.meta.env.VITE_APP_API_URL_;
const BASE_URL = `${API_URL}/settings`;
interface dataModel {
  value: number;
  id: number;
}
export function useUpdateSetting() {
  const queryClient = useQueryClient();
  const {
    mutate: updateSetting,
    isPending: isUpdating,
    error,
    data,
  } = useMutation({
    mutationFn: (itemData: dataModel) =>
      request(
        "",
        "Setting",
        BASE_URL,
        { value: itemData.value },
        "PUT",
        itemData.id
      ),
    onSuccess: () => {
      toast.success("Setting's updated.");
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
    onError: (err) => {
      toast.error(err.message);
      throw new Error(err.message);
    },
  });

  return {
    updateSetting,
    isUpdating,
    error,
    data,
  };
}
