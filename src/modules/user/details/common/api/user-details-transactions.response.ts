import TransactionProvider from "../../../../../common/types/transaction-provider";
import TransactionStatus from "../../../../../common/types/transaction-status";

export type UserDetailsResponseTransaction = {
  id: string;
  provider: {
    id: string;
    transactionId: string;
    name: TransactionProvider;
  };
  status: TransactionStatus;
  ticket: {
    id: string;
    name: string;
  };
  package: {
    id: string;
    name: string;
  };
  date: string;
  price: number;
  priceCurrency: string;
};

type UserDetailsTransactionsResponse = UserDetailsResponseTransaction[];

export default UserDetailsTransactionsResponse;
