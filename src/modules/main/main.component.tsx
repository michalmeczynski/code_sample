import { FC } from "react";
import appConfig from "../../app.config";
import BreadcrumbsComponent from "../../common/components/breadcrumbs/breadcrumbs.component";
import DashboardCardComponent from "../../common/components/card/dashboard/dashboard-card.component";
import Column from "../../common/components/grid/column";
import Row from "../../common/components/grid/row";
import HeadingComponent from "../../common/components/heading/heading.component";
import useDocumentTitle from "../../common/hooks/use-document-title";
import UserIcon from "../user/common/icons/user-icon";
import userRoutesHelper from "../user/common/routes/user-routes.helper";

const MainComponent: FC = () => {
  useDocumentTitle();
  return (
    <div>
      <HeadingComponent
        title={`Welcome to ${appConfig.appName} Admin Panel`}
        subtitle={`Manage your site`}
      />
      <BreadcrumbsComponent breadcrumbs={[]} />
      <Row>
        <Column def={6} lg={4} xl={3} withPaddings>
          <DashboardCardComponent
            title="Users"
            icon={UserIcon.dashboard}
            linkTo={userRoutesHelper.getDashboardRoute()}
          />
        </Column>
      </Row>
    </div>
  );
};

export default MainComponent;
