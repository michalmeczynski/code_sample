import { useState } from "react";

type PaginationParams = {
  totalResults: number;
};

const usePagination = (params?: Partial<PaginationParams>) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const totalPages = params?.totalResults
    ? Math.ceil(params.totalResults / pageSize)
    : 0;

  return {
    page,
    pageSize,
    setPage,
    setPageSize,
    totalPages,
  };
};

export default usePagination;
