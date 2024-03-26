import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { TestTypesModel } from "../core/_models";
import { request } from "../../../../utils/requestHelpers";
const API_URL = import.meta.env.VITE_APP_API_URL;
const BASE_URL = `${API_URL}/test-type`;

export function useUpdateTestType(id: number) {
  const queryClient = useQueryClient();
  const {
    data,
    mutate: updateTestType,
    isPending: isUpdating,
    error,
  } = useMutation({
    mutationFn: (TestTypeData: TestTypesModel) =>
      request("", "TestType", BASE_URL, TestTypeData, "PUT", id),
    onSuccess: () => {
      toast.success("Test Type successfully updated.");
      queryClient.invalidateQueries({ queryKey: ["testType", id] });
      queryClient.invalidateQueries({ queryKey: ["testTypes"] });
    },
    onError: (err) => {
      toast.error(err.message);
      throw new Error(err.message);
    },
  });

  return {
    updateTestType,
    isUpdating,
    error,
    data,
  };
}
