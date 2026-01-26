import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";
import { subDays } from "date-fns";

export function useRecentStays() {
  const [searchParams] = useSearchParams();
  const numsDay = searchParams.get("last")
    ? Number(searchParams.get("last"))
    : 7;
  const queryDate = subDays(new Date(), numsDay).toISOString();
  const { isLoading, data: stays } = useQuery({
    queryKey: ["stays", `last-${numsDay}`],
    queryFn: () => getStaysAfterDate(queryDate),
  });
  const confirmStay = stays?.filter(
    (stay) => stay.status === "checked-out" || stay.status === "checked-in"
  );
  return { isLoading, confirmStay, stays, numsDay };
}
