import { IconProp } from "@fortawesome/fontawesome-svg-core";

type Breadcrumb = {
  text?: string;
  icon: IconProp;
  linkTo: string | undefined;
  isSpinning?: boolean;
};

export default Breadcrumb;
