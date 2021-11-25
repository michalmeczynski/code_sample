import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FC, useCallback, useEffect, useState } from "react";
import CardRefreshButtonComponent from "../../../../common/components/card/button/refresh/card-refresh-button.component";
import CardComponent from "../../../../common/components/card/card.component";
import userDetailsApiService from "../common/api/user-details-api.service";
import userDetailsFactory from "../common/factory/user-details.factory";
import UserTransaction from "../common/types/user-transaction";
import UserTransactionsTableComponent from "./table/user-transactions-table.component";

const UserTransactionsComponent: FC = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [transactions, setTransactions] = useState<UserTransaction[]>([]);

  const totalResults = transactions.length;

  const fetchTransactions = useCallback(() => {
    setIsFetching(true);
    userDetailsApiService.fetchTransactions().then((response) => {
      const transactions = userDetailsFactory.getUserTransactions(response);
      setTransactions(transactions);
      setIsFetching(false);
    });
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return (
    <CardComponent
      header={{
        title: "Transactions",
        subtitle: `Total: ${totalResults}`,
        icon: faShoppingCart,
        actions: [<CardRefreshButtonComponent onClick={fetchTransactions} />],
      }}
    >
      <UserTransactionsTableComponent
        isLoading={isFetching}
        transactions={transactions}
      />
    </CardComponent>
  );
};

export default UserTransactionsComponent;
