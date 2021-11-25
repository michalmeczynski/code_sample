import faker from "faker";
import fakeApiService from "../../../../../common/utils/api/fake-api.service";
import UserListingItem from "../types/user-listing-item";
import UserListingResponse from "./user-listing.response";

const fetchListing = (): Promise<UserListingResponse> => {
  const users: UserListingItem[] = [];

  for (let i = 0; i < 10; i++) {
    users.push({
      id: faker.datatype.number(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      createdAt: faker.date.past(),
      isActive: faker.datatype.boolean(),
    });
  }

  const response: UserListingResponse = {
    users,
    totalCount: 34000,
  };

  return fakeApiService.fakeFetch(response);
};

const userListingApiService = {
  fetchListing,
};

export default userListingApiService;
