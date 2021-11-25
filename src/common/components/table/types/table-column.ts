import { ReactNode } from "react";

type TableColumn<T = any, S = string> = {
  header: ReactNode;
  accessor: keyof T;
  colSpan?: number;
  sortDescKey?: S;
  sortAscKey?: S;
};

export default TableColumn;
