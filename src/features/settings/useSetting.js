import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings.js";
export function useSetting() {
  const {
    isLoading,
    data: setting,
    error,
  } = useQuery({
    queryKey: ["setting"],
    queryFn: getSettings,
  });
  return { isLoading, setting, error };
}
