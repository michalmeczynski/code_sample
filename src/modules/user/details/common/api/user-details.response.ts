type UserDetailsResponse = {
  uid: string;
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  lastLogin: string;
  isActive: boolean;
  isDeleted: boolean;
  isBlocked: boolean;
  isAgreedForEmailSubscription: boolean;
  refLink: string;
};

export default UserDetailsResponse;
