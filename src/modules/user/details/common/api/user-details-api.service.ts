import faker from "faker";
import TransactionProvider from "../../../../../common/types/transaction-provider";
import TransactionStatus from "../../../../../common/types/transaction-status";
import UserDetailsProgramPartnerDataResponse from "./user-details-program-partner-data.response";
import UserDetailsTransactionsResponse, {
  UserDetailsResponseTransaction,
} from "./user-details-transactions.response";
import UserDetailsRequest from "./user-details.request";
import UserDetailsResponse from "./user-details.response";

const fetchUserData = (
  request: UserDetailsRequest
): Promise<UserDetailsResponse> => {
  const response: UserDetailsResponse = {
    id: faker.datatype.number(),
    uid: faker.datatype.uuid(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    createdAt: faker.date.past().toJSON(),
    lastLogin: faker.date.past().toJSON(),
    refLink: faker.random.word(),
    isActive: faker.datatype.boolean(),
    isAgreedForEmailSubscription: faker.datatype.boolean(),
    isBlocked: faker.datatype.boolean(),
    isDeleted: faker.datatype.boolean(),
  };

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(response);
    }, 1500);
  });
};

const fetchProgramPartner =
  (): Promise<UserDetailsProgramPartnerDataResponse> => {
    const response: UserDetailsProgramPartnerDataResponse = {
      totalPurchases: faker.datatype.number({ min: 100, max: 1000 }),
      code: faker.datatype.string(10),
    };

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(response);
      }, 1500);
    });
  };

const fetchTransactions = (): Promise<UserDetailsTransactionsResponse> => {
  const response: UserDetailsTransactionsResponse = [];

  for (let i = 0; i < 20; i++) {
    const newTransaction: UserDetailsResponseTransaction = {
      id: faker.datatype.uuid(),
      date: faker.date.past().toJSON(),
      package: {
        id: faker.datatype.uuid(),
        name: faker.random.word(),
      },
      ticket: {
        id: faker.datatype.uuid(),
        name: faker.random.words(2),
      },
      price: faker.datatype.float({ min: 1, max: 100 }),
      priceCurrency: "PLN",
      provider: {
        id: faker.datatype.uuid(),
        name: faker.random.arrayElement<TransactionProvider>([
          "BLUEMEDIA",
          "PAYPAL",
        ]),
        transactionId: faker.datatype.string(18),
      },
      status: faker.random.arrayElement<TransactionStatus>([
        "CANCELLED",
        "CHARGED",
        "FAILED",
        "PENDING",
        "REFUSED",
      ]),
    };

    response.push(newTransaction);
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(response);
    }, 1500);
  });
};

const userDetailsApiService = {
  fetchUserData,
  fetchProgramPartner,
  fetchTransactions,
};

export default userDetailsApiService;
