import styled from "styled-components";
import { useRecentBooking } from "./useRecentBooking.js";
import Spinner from "../../ui/Spinner";
import { useRecentStays } from "./useRecentStays.js";
import Stats from "./Stats";
import { useCabins } from "../cabins/useCabins.js";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import Today from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;
function DashboardLayout() {
  const { isLoading: isLoading1, bookings } = useRecentBooking();
  const {
    isLoading: isLoading2,
    stays,
    confirmStay,
    numsDay,
  } = useRecentStays();
  const { isLoading: isLoading3, cabins } = useCabins();
  if (isLoading1 || isLoading2 || isLoading3) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Stats
        bookings={bookings}
        confirmStay={confirmStay}
        numsDays={numsDay}
        cabinCount={cabins.length}
      />
      <Today />
      <DurationChart confirmStay={confirmStay} />
      <SalesChart bookings={bookings} numsDay={numsDay} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
