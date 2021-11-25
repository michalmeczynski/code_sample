import { faHome } from "@fortawesome/free-solid-svg-icons";
import appRoutesHelper from "../../../../../routes/app-routes.helper";
import Breadcrumb from "../types/breadcrumb";

const homeBreadcrumb: Breadcrumb = {
  icon: faHome,
  text: "Home",
  linkTo: appRoutesHelper.getMainRoute(),
};

const getMainPageBreadcrumb = (): Breadcrumb => homeBreadcrumb;

const breadcrumbsHelper = {
  getMainPageBreadcrumb,
};

export default breadcrumbsHelper;
