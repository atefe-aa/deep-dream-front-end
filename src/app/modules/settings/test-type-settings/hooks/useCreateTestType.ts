import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { postMethodRequest } from "../../../../utils/requestHelpers";
import { TestTypesModel } from "../core/_models";

const API_URL = import.meta.env.VITE_APP_API_URL_;
const BASE_URL = `${API_URL}/test-type`;

export function useCreateTestType() {
  const queryClient = useQueryClient();
  const {
    mutate: createTestType,
    isPending: isCreating,
    error,
    data,
  } = useMutation({
    mutationFn: (testTypeData : TestTypesModel) =>
      postMethodRequest("", "Test Type", BASE_URL, testTypeData),
    onSuccess: () => {
      toast.success("New Test Type successfully created.");
      queryClient.invalidateQueries({ queryKey: ["testTypes"] });
    },
    onError: (err) => {
      toast.error(err.message);
      throw new Error(err.message);
    },
  });

  return {
    createTestType,
    isCreating,
    error,
    data,
  };
}
