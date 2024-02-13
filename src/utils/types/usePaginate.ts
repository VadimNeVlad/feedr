import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const usePaginate = (withSortingBtns = true) => {
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(window.location.search);

  const [page, setPage] = useState(0);
  const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "latest");

  const handleNextPage = () => setPage((prev) => prev + 1);

  const handleSortChange = (value: string) => {
    setPage(0);
    setSortBy(value);
    navigate(value === "latest" ? "" : `?sortBy=${value}`);
  };

  useEffect(() => {
    if (!withSortingBtns) {
      setPage(0);
    }
  }, [withSortingBtns]);

  return {
    page,
    sortBy,
    handleNextPage,
    handleSortChange,
  };
};
