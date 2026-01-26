import { deleteBooking as deletes } from "../../services/apiBookings";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteBooking } = useMutation({
    mutationFn: (bookingId) => deletes(bookingId),
    onError: (err) => toast.error(err.message),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["booking"],
      });
      toast.success("Delete this booking successfully!");
    },
  });
  return { isDeleting, deleteBooking };
}
