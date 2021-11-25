import UserListingItem from "../types/user-listing-item";

type UserListingResponse = {
  users: UserListingItem[];
  totalCount: number;
};

export default UserListingResponse;
