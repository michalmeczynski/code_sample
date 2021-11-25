import TransactionProvider from "../../../../../common/types/transaction-provider";
import TransactionStatus from "../../../../../common/types/transaction-status";

type UserTransaction = {
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
  date: Date;
  price: number;
  priceCurrency: string;
};

export default UserTransaction;
