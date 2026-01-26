import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { getBookingsAfterDate } from "../../services/apiBookings";
export function useRecentBooking() {
  const [searchParams] = useSearchParams();
  const numsDay = searchParams.get("last")
    ? Number(searchParams.get("last"))
    : 7;
  const queryDate = subDays(new Date(), numsDay).toISOString();

  const { isLoading, data: bookings } = useQuery({
    queryKey: ["bookings", `last-${numsDay}`],
    queryFn: () => getBookingsAfterDate(queryDate),
  });
  return { isLoading, bookings };
}
