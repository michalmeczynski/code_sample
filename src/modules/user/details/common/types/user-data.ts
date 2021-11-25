type UserData = {
  uid: string;
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  creationDate: Date;
  lastLoginDate: Date;
  refLink: string;
  isActive: boolean;
  isBlocked: boolean;
  isDeleted: boolean;
  isAgreedForEmailSubscription: boolean;
};

export default UserData;
