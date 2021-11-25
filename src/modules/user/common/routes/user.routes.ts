import RouteItem from "../../../../routes/route-item";
import UserDashboardComponent from "../../dashboard/user-dashboard.component";
import UserDetailsSection from "../../details/user-details.section";
import UserListingComponent from "../../listing/user-listing.component";
import userRoutesUrls from "./user-routes-urls";

const UserRoutes: RouteItem[] = [
  {
    path: userRoutesUrls.dashboard,
    component: UserDashboardComponent,
  },
  {
    path: userRoutesUrls.listing,
    component: UserListingComponent,
  },
  {
    path: userRoutesUrls.details,
    component: UserDetailsSection,
  },
];

export default UserRoutes;
