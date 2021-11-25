import Breadcrumb from "../../../../common/components/breadcrumbs/common/types/breadcrumb";
import UserIcon from "../icons/user-icon";
import userRoutesHelper from "../routes/user-routes.helper";
import UserDetailsBreadcrumbsParams from "./types/user-details-breadcrumbs-params";

const getDashboardBreadcrumbs = (): Breadcrumb[] => {
  return [
    {
      icon: UserIcon.dashboard,
      text: "Users",
      linkTo: userRoutesHelper.getDashboardRoute(),
    },
  ];
};

const getListingBreadcrumbs = (): Breadcrumb[] => {
  return [
    ...getDashboardBreadcrumbs(),
    {
      icon: UserIcon.listing,
      text: "List",
      linkTo: userRoutesHelper.getListingRoute(),
    },
  ];
};

const getDetailsBreadcrumbs = (
  params: UserDetailsBreadcrumbsParams
): Breadcrumb[] => {
  return [
    ...getListingBreadcrumbs(),
    {
      icon: UserIcon.details,
      text: params.fullName,
      linkTo: userRoutesHelper.getDetailsRoute({ id: params.userId }),
    },
  ];
};

const userBreadcrumbsHelper = {
  getDashboardBreadcrumbs,
  getListingBreadcrumbs,
  getDetailsBreadcrumbs,
};

export default userBreadcrumbsHelper;
