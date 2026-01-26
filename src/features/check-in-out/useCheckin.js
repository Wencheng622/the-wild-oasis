import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { useNavigate } from "react-router-dom";

import { toast } from "react-hot-toast";
export function useCheckin() {
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const { isLoading: isCheckingIn, mutate: checkin } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),
    onError: (err) => toast.error(err.message),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in`);
      queryClient.invalidateQueries({
        active: true,
      });
      navigate("/");
    },
  });
  return { isCheckingIn, checkin };
}
