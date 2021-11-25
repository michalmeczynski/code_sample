import UserDetailsTransactionsResponse, {
  UserDetailsResponseTransaction,
} from "../api/user-details-transactions.response";
import UserDetailsResponse from "../api/user-details.response";
import UserData from "../types/user-data";
import UserTransaction from "../types/user-transaction";

const getUserData = (response: UserDetailsResponse): UserData => {
  const userData: UserData = {
    id: response.id,
    uid: response.uid,
    firstName: response.firstName,
    lastName: response.lastName,
    email: response.email,
    refLink: response.refLink,
    creationDate: new Date(response.createdAt),
    lastLoginDate: new Date(response.lastLogin),
    isActive: response.isActive,
    isDeleted: response.isDeleted,
    isBlocked: response.isBlocked,
    isAgreedForEmailSubscription: response.isAgreedForEmailSubscription,
  };

  return userData;
};

const getUserTransaction = (
  responseTransaction: UserDetailsResponseTransaction
): UserTransaction => {
  return { ...responseTransaction, date: new Date(responseTransaction.date) };
};

const getUserTransactions = (
  response: UserDetailsTransactionsResponse
): UserTransaction[] => {
  return response.map((responseItem) => {
    return getUserTransaction(responseItem);
  });
};

const userDetailsFactory = {
  getUserData,
  getUserTransactions,
};

export default userDetailsFactory;
