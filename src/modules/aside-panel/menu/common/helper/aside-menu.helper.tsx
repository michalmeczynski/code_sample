import UserIcon from "../../../../user/common/icons/user-icon";
import userRoutesHelper from "../../../../user/common/routes/user-routes.helper";
import AsideMenuItem from "../types/aside-menu-item";

const getAsideMenuItems = (): AsideMenuItem[] => {
  return [
    {
      text: `Users`,
      key: `users`,
      icon: UserIcon.dashboard,
      linkTo: userRoutesHelper.getDashboardRoute(),
      subMenu: [
        {
          text: `List`,
          key: `usersList`,
          icon: UserIcon.listing,
          linkTo: userRoutesHelper.getListingRoute(),
        },
      ],
    },
  ];
};

const asideMenuHelper = {
  getAsideMenuItems,
};

export default asideMenuHelper;
