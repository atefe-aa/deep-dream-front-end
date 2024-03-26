import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { ReportTemplateModel } from "../_model";
import { request } from "../../../utils/requestHelpers";

const API_URL = import.meta.env.VITE_APP_API_URL;
const BASE_URL = `${API_URL}/report`;

export function useCreateReport() {
  const queryClient = useQueryClient();
  const {
    mutate: createReport,
    isPending: isCreating,
    error,
    data,
  } = useMutation({
    mutationFn: (reportData: ReportTemplateModel) =>
      request("", "Report", BASE_URL, reportData, "POST"),
    onSuccess: () => {
      toast.success("Report successfully created.");
      queryClient.invalidateQueries({ queryKey: ["registrations"] });
    },
    onError: (err) => {
      toast.error(err.message);
      throw new Error(err.message);
    },
  });

  return {
    createReport,
    isCreating,
    error,
    data,
  };
}
