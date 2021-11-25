import { FC } from "react";
import LoaderComponent from "../loader/loader.component";
import TableColumnSortComponent from "./column/sort/table-column-sort.component";
import TableColumn from "./types/table-column";
import TableRow from "./types/table-row";

type TableProps = {
  columns: TableColumn[];
  rows: TableRow[];
  isLoading?: boolean;
  isError?: boolean;
  noDataMessage?: string;
  errorDataLoadingMessage?: string;
  sortKey?: string;
  onSortKeyChange?: (sortKey: string | undefined) => void;
};

const TableComponent: FC<TableProps> = (props) => {
  const getTotalColumnsSpan = () => {
    let totalSpan = 0;

    for (const column of props.columns) {
      totalSpan += column.colSpan ?? 1;
    }

    return totalSpan;
  };

  const totalColumnsSpan = getTotalColumnsSpan();

  const checkIsColumnSortEnabled = (column: TableColumn): boolean => {
    if (column.sortAscKey && column.sortDescKey) {
      return true;
    }

    return false;
  };

  const validateColumnSorting = (column: TableColumn) => {
    if (column.sortAscKey && !column.sortDescKey) {
      console.error(
        `Missing 'sortDescKey' in column ${column.header} declaration.`
      );
      return;
    }
    if (column.sortDescKey && !column.sortAscKey) {
      console.error(
        `Missing 'sortAscKey' in column ${column.header} declaration.`
      );
      return;
    }
  };

  return (
    <table className="table">
      <thead className="table__head">
        <tr className="table__tr">
          {props.columns.map((column) => {
            const isSortEnabled = checkIsColumnSortEnabled(column);

            if (isSortEnabled) {
              validateColumnSorting(column);
            }

            const isAscSortActive = props.sortKey === column.sortAscKey;
            const isDescSortActive = props.sortKey === column.sortDescKey;

            const onSortButtonClick = () => {
              if (!props.onSortKeyChange) {
                return;
              }

              if (isAscSortActive) {
                props.onSortKeyChange(undefined);
                return;
              }

              if (isDescSortActive) {
                props.onSortKeyChange(column.sortAscKey);
                return;
              }

              props.onSortKeyChange(column.sortDescKey);
            };

            return (
              <th
                key={`column-${column.accessor as string}`}
                colSpan={column.colSpan}
                className="table__th"
              >
                <div className="table__th__content">
                  <div className="table__th__title">{column.header}</div>
                  <div className="table__th__actions">
                    {isSortEnabled && (
                      <TableColumnSortComponent
                        isAscActive={isAscSortActive}
                        isDescActive={isDescSortActive}
                        onClick={onSortButtonClick}
                      />
                    )}
                  </div>
                </div>
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {props.isLoading && !props.rows.length ? (
          <tr>
            <td colSpan={totalColumnsSpan}>
              <div className="table__loader_wrapper">
                <LoaderComponent type="primary" />
              </div>
            </td>
          </tr>
        ) : props.isError ? (
          <tr>
            <td colSpan={totalColumnsSpan} className="table__error_wrapper">
              {props.errorDataLoadingMessage}
            </td>
          </tr>
        ) : props.rows.length === 0 ? (
          <tr>
            <td colSpan={totalColumnsSpan}>
              <div className="table__no_data_wrapper">
                {props.noDataMessage}
              </div>
            </td>
          </tr>
        ) : (
          props.rows.map((row) => (
            <tr className="table__tr" key={`row-${row.id}`}>
              {props.columns.map((column) => (
                <td
                  key={column.accessor as string}
                  className="table__td"
                  data-label={`${column.header}:`}
                  colSpan={column.colSpan}
                >
                  <div className="table__td__content">
                    {(row.value as any)[column.accessor]}
                  </div>
                </td>
              ))}
            </tr>
          ))
        )}
        {props.isLoading && !!props.rows.length && (
          <>
            <tr className="table__overlay_loader_wrapper"></tr>
            <tr className="table__overlay_loader">
              <td colSpan={totalColumnsSpan}>
                <div className="table__loader_wrapper">
                  <LoaderComponent type="primary" />
                </div>
              </td>
            </tr>
          </>
        )}
      </tbody>
    </table>
  );
};

TableComponent.defaultProps = {
  noDataMessage: "No records found",
  errorDataLoadingMessage:
    "Something went wrong while data loading. Try again later.",
};

export default TableComponent;
