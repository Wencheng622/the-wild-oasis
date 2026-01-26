import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers.js";
import {
  HiOutlineBriefcase,
  HiOutlineBanknotes,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
function Stats({ confirmStay, bookings, numsDays, cabinCount }) {
  console.log(bookings);
  const numBookings = bookings.length;
  const totalSale = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);
  const checksin = confirmStay.length;
  const totalNight = numsDays * cabinCount;

  const occupancy =
    confirmStay.reduce((acc, cur) => acc + cur.numNights, 0) / totalNight;

  console.log(confirmStay);

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(totalSale)}
      />
      <Stat
        title="Check ins"
        color="indigo"
        icon={<HiOutlineCalendarDays />}
        value={checksin}
      />
      <Stat
        title="Occupancy rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={Math.round(occupancy * 100) + "%"}
      />
    </>
  );
}

export default Stats;
