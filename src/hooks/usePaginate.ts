import { useSearchParams } from "react-router-dom";
export const usePaginate = () => {
  const [params, setParams] = useSearchParams();
  const requested = params.get("sortBy");
  const sortBy =
    requested === "oldest" || requested === "top" ? requested : "latest";
  const handleSortChange = (value: string) => {
    const next = new URLSearchParams(params);
    if (value === "latest") next.delete("sortBy");
    else next.set("sortBy", value);
    setParams(next);
  };
  return { sortBy, handleSortChange };
};
