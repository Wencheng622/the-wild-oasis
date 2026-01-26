import { useQueryClient, useMutation } from "@tanstack/react-query";
import { updateSetting } from "../../services/apiSettings";
import { toast } from "react-hot-toast";
export function useEditSetting() {
  const queryClient = useQueryClient();

  const { isLoading: isEditing, mutate: editSetting } = useMutation({
    mutationFn: (newSetting) => updateSetting(newSetting),
    onSuccess: () => {
      toast.success("Setting successfully edited");
      queryClient.invalidateQueries({
        queryKey: ["setting"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isEditing, editSetting };
}
