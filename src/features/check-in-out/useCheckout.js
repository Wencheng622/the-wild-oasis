import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { useNavigate } from "react-router-dom";

import { toast } from "react-hot-toast";
export function useCheckout() {
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const { isLoading: isCheckingOut, mutate: checkout } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onError: (err) => toast.error(err.message),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked out`);
      queryClient.invalidateQueries({
        active: true,
      });
    },
  });
  return { isCheckingOut, checkout };
}
