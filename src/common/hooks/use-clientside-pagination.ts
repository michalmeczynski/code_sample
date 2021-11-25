import usePagination from "./use-pagination";

type PaginationParams<T> = {
  data: T[];
  totalResults: number;
};

const useClientSidePagination = <T extends {}>(params: PaginationParams<T>) => {
  const { page, pageSize, setPage, setPageSize } = usePagination({
    totalResults: params.totalResults,
  });

  const minimumItemIndex = (page - 1) * pageSize + 1;
  const maximumItemIndex = (page - 1) * pageSize + pageSize;

  const dataFromPage = params.data.slice(minimumItemIndex, maximumItemIndex);

  return {
    page,
    pageSize,
    setPage,
    setPageSize,
    dataFromPage,
  };
};

export default useClientSidePagination;
