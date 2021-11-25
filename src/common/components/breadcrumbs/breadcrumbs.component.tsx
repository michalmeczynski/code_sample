import { faChevronRight, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, Fragment } from "react";
import { useLocation } from "react-router-dom";
import breadcrumbsHelper from "./common/helper/breadcrumbs.helper";
import Breadcrumb from "./common/types/breadcrumb";
import BreadcrumbItemComponent from "./item/breadcrumb-item.component";

type BreadcrumbsProps = {
  breadcrumbs: Breadcrumb[];
  isLoading?: boolean;
};

const BreadcrumbsComponent: FC<BreadcrumbsProps> = (props) => {
  const location = useLocation();

  const breadcrumbs: Breadcrumb[] = [
    breadcrumbsHelper.getMainPageBreadcrumb(),
    ...props.breadcrumbs,
  ];

  const loadingBreadcrumbs: Breadcrumb[] = [
    breadcrumbsHelper.getMainPageBreadcrumb(),
    {
      icon: faSpinner,
      isSpinning: true,
      text: "Loading...",
      linkTo: "",
    },
  ];

  const breadcrumbsToRender = props.isLoading
    ? loadingBreadcrumbs
    : breadcrumbs;

  return (
    <div className="breadcrumbs">
      {breadcrumbsToRender.map((breadcrumb, index) => {
        const isLastItem = index === breadcrumbsToRender.length - 1;

        const isActive = breadcrumb.linkTo === location.pathname;

        return (
          <Fragment key={index}>
            <BreadcrumbItemComponent isActive={isActive} {...breadcrumb} />
            {!isLastItem && (
              <div className={"breadcrumb_separator"}>
                <FontAwesomeIcon
                  icon={faChevronRight}
                  className="breadcrumb_separator__icon"
                  size="sm"
                />
              </div>
            )}
          </Fragment>
        );
      })}
    </div>
  );
};

export default BreadcrumbsComponent;
