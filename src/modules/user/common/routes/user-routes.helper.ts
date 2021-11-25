import UserDetailsRouteParams from "./types/user-details-route-params";
import userRoutesUrls from "./user-routes-urls";

const getDashboardRoute = (): string => {
  return userRoutesUrls.dashboard;
};

const getListingRoute = (): string => {
  return userRoutesUrls.listing;
};

const getDetailsRoute = (params: UserDetailsRouteParams): string => {
  return userRoutesUrls.details.replace(`:id`, params.id);
};

const userRoutesHelper = {
  getDashboardRoute,
  getListingRoute,
  getDetailsRoute,
};

export default userRoutesHelper;
