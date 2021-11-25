import MainComponent from "../modules/main/main.component";
import UserRoutes from "../modules/user/common/routes/user.routes";
import appRoutesUrls from "./app-routes-urls";
import RouteItem from "./route-item";

const AppRoutes: RouteItem[] = [
  {
    path: appRoutesUrls.main,
    component: MainComponent,
    exact: true,
  },
  ...UserRoutes,
];

export default AppRoutes;
