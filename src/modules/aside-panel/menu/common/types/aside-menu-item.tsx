import { IconProp } from "@fortawesome/fontawesome-svg-core";

type AsideMenuItem = {
  key: string;
  text: string;
  icon: IconProp;
  linkTo: string;
  subMenu?: AsideMenuItem[];
};

export default AsideMenuItem;
