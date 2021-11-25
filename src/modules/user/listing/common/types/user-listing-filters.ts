type UserListingFilters = {
  id?: string;
  email?: string;
  name?: string;
  createdAt?: {
    from?: Date;
    to?: Date;
  };
  isActive?: boolean;
};

export default UserListingFilters;
