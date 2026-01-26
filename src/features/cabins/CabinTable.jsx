import { getCabins } from "../../services/apiCabins.js";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../ui/Spinner";
import CabinRow from "../../features/cabins/CabinRow";
import { useCabins } from "./useCabins.js";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

function CabinTable() {
  const { isLoading, cabins, error } = useCabins();

  const [searchParams] = useSearchParams();
  if (!cabins?.length) return <Empty resource="cabin" />;

  if (isLoading) {
    return <Spinner />;
  }
  // this part is for filter
  const filterValue = searchParams.get("discount") || "all";
  let filteredCabin;
  if (filterValue === "all") filteredCabin = cabins;
  if (filterValue === "no-discount")
    filteredCabin = cabins.filter((t) => t.discount === 0);
  if (filterValue === "with-discount")
    filteredCabin = cabins.filter((t) => t.discount > 0);
  // this part is for sorted
  const sortValue = searchParams.get("sortBy") || "starDate-asc";
  const [field, direction] = sortValue.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabin = filteredCabin.sort((a, b) => {
    return (a[field] - b[field]) * modifier;
  });

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header role="row">
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabin}
          render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
