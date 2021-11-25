import React, { FC } from "react";
import BreadcrumbsComponent from "../../../common/components/breadcrumbs/breadcrumbs.component";
import DashboardCardComponent from "../../../common/components/card/dashboard/dashboard-card.component";
import Column from "../../../common/components/grid/column";
import Row from "../../../common/components/grid/row";
import HeadingComponent from "../../../common/components/heading/heading.component";
import useDocumentTitle from "../../../common/hooks/use-document-title";
import userBreadcrumbsHelper from "../common/breadcrumbs/user-breadcrumbs.helper";
import UserIcon from "../common/icons/user-icon";
import userRoutesHelper from "../common/routes/user-routes.helper";

type UserDashboardProps = {};

const UserDashboardComponent: FC<UserDashboardProps> = () => {
  const title = `Users Dashboard`;

  useDocumentTitle(title);

  return (
    <div className="user_dashboard">
      <HeadingComponent title={title} />

      <BreadcrumbsComponent
        breadcrumbs={userBreadcrumbsHelper.getDashboardBreadcrumbs()}
      />
      <Row>
        <Column def={6} lg={4} xl={3} withPaddings>
          <DashboardCardComponent
            title="List"
            icon={UserIcon.listing}
            linkTo={userRoutesHelper.getListingRoute()}
          />
        </Column>
      </Row>
    </div>
  );
};

export default UserDashboardComponent;
