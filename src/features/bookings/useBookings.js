import { useQuery, useQueryClient } from "@tanstack/react-query";

import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const statusValue = searchParams.get("status");

  const filter =
    !statusValue || statusValue === "all"
      ? null
      : { field: "status", value: statusValue };
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };
  // pagination
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
  // query
  const {
    isLoading,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    queryKey: ["booking", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });
  // pre-fetching
  if (page < Math.ceil(count / PAGE_SIZE)) {
    queryClient.prefetchQuery({
      queryKey: ["booking", filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });
  }
  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["booking", filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });
  }

  return { isLoading, bookings, error, count };
}
