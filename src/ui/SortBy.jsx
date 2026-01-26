import Select from "./Select";
import { useSearchParams } from "react-router-dom";
function SortBy({ options }) {
  const [useParams, setUseParams] = useSearchParams();
  const sortBy = useParams.get("sortBy") || "";
  function handleChange(e) {
    useParams.set("sortBy", e.target.value);
    setUseParams(useParams);
  }
  return (
    <Select
      options={options}
      type="white"
      onChange={handleChange}
      value={sortBy}
    />
  );
}

export default SortBy;
