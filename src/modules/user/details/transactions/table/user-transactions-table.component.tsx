import React, { ReactNode, FC } from "react";
import { faCubes, faTag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TableNavLinkComponent from "../../../../../common/components/table/nav-link/table-nav-link.component";
import TableComponent from "../../../../../common/components/table/table.component";
import TableColumn from "../../../../../common/components/table/types/table-column";
import TableRow from "../../../../../common/components/table/types/table-row";
import dateService from "../../../../../common/utils/date/date.service";
import UserTransaction from "../../common/types/user-transaction";
import TransactionProvider from "../../../../../common/types/transaction-provider";
import TransactionStatus from "../../../../../common/types/transaction-status";
import TransactionProviderBadgeComponent from "../../../../../shared/transaction/badge/provider/transaction-provider-badge.component";
import TransactionStatusBadgeComponent from "../../../../../shared/transaction/badge/status/transaction-status-badge.component";

type TableColumnAccessors = {
  internalId: ReactNode;
  providerTransactionId: ReactNode;
  provider: ReactNode;
  ticketPack: ReactNode;
  status: ReactNode;
  date: ReactNode;
  price: ReactNode;
};

type UserTransactionsTableProps = {
  isLoading: boolean;
  transactions: UserTransaction[];
};

const UserTransactionsTableComponent: FC<UserTransactionsTableProps> = (
  props
) => {
  const tableColumns: TableColumn<TableColumnAccessors>[] = [
    {
      header: "Internal ID",
      accessor: "internalId",
      colSpan: 2,
    },
    {
      header: "Provider Transaction ID",
      accessor: "providerTransactionId",
      colSpan: 2,
    },
    {
      header: "Provider",
      accessor: "provider",
      colSpan: 1,
    },
    {
      header: "Ticket/Pack",
      accessor: "ticketPack",
      colSpan: 2,
    },
    {
      header: "Status",
      accessor: "status",
      colSpan: 1,
    },
    {
      header: "Date",
      accessor: "date",
      colSpan: 2,
    },
    {
      header: "Price",
      accessor: "price",
      colSpan: 1,
    },
  ];

  const ProviderCell = ({
    providerName,
  }: {
    providerName: TransactionProvider;
  }) => {
    return <TransactionProviderBadgeComponent providerName={providerName} />;
  };

  const StatusCell = ({ status }: { status: TransactionStatus }) => {
    return <TransactionStatusBadgeComponent status={status} />;
  };

  const tableRows: TableRow<TableColumnAccessors>[] = props.transactions.map(
    (transaction) => {
      return {
        id: transaction.id,
        value: {
          internalId: (
            <TableNavLinkComponent to={""}>
              {transaction.id}
            </TableNavLinkComponent>
          ),
          providerTransactionId: <>{transaction.provider.transactionId}</>,
          provider: <ProviderCell providerName={transaction.provider.name} />,
          ticketPack: (
            <div
              title={`Ticket: ${transaction.ticket.name} | Pack: ${transaction.package.name}`}
            >
              <div className="d-flex align-items-center">
                <FontAwesomeIcon icon={faTag} size="sm" className="mr-2" />
                <div className="text-truncate">{transaction.ticket.name}</div>
              </div>
              <div className="d-flex align-items-center">
                <FontAwesomeIcon icon={faCubes} size="sm" className="mr-2" />
                <div className="text-truncate">{transaction.package.name}</div>
              </div>
            </div>
          ),
          status: <StatusCell status={transaction.status} />,
          date: <>{dateService.getDateTimeString(transaction.date)}</>,
          price: (
            <>{`${transaction.price.toFixed(2)} ${
              transaction.priceCurrency
            }`}</>
          ),
        },
      };
    }
  );

  return (
    <TableComponent
      columns={tableColumns}
      rows={tableRows}
      isLoading={props.isLoading}
    />
  );
};

export default UserTransactionsTableComponent;
