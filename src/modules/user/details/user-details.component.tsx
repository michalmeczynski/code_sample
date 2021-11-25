import { FC, useCallback, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import BreadcrumbsComponent from "../../../common/components/breadcrumbs/breadcrumbs.component";
import Column from "../../../common/components/grid/column";
import Row from "../../../common/components/grid/row";
import HeadingComponent from "../../../common/components/heading/heading.component";
import PageLoaderComponent from "../../../common/components/page/loader/page-loader.component";
import useDocumentTitle from "../../../common/hooks/use-document-title";
import UserDetailsBreadcrumbsParams from "../common/breadcrumbs/types/user-details-breadcrumbs-params";
import userBreadcrumbsHelper from "../common/breadcrumbs/user-breadcrumbs.helper";
import UserDetailsRouteParams from "../common/routes/types/user-details-route-params";
import UserDetailsBasicInfoComponent from "./basic-info/user-details-basic-info.component";
import userDetailsApiService from "./common/api/user-details-api.service";
import { useUserDetailsContext } from "./common/context/user-details.context";
import userDetailsFactory from "./common/factory/user-details.factory";
import UserEventsAccessComponent from "./events-access/user-events-access.component";
import UserProgramPartnerComponent from "./program-partner/user-program-partner.component";
import UserTransactionsComponent from "./transactions/user-transactions.component";

type UserDetailsProps = {};

const UserDetailsComponent: FC<UserDetailsProps> = () => {
  const { userData, isFetching, setIsFetching, setUserData } =
    useUserDetailsContext();
  const { id: routeUserId } = useParams<UserDetailsRouteParams>();

  const fullName = userData ? `${userData.firstName} ${userData.lastName}` : "";

  const breadcrumbsParams: UserDetailsBreadcrumbsParams = {
    userId: userData?.id ? String(userData.id) : "",
    fullName: fullName ?? "",
  };

  const fetchUserData = useCallback(() => {
    setIsFetching(true);

    userDetailsApiService.fetchUserData({}).then((response) => {
      const userData = userDetailsFactory.getUserData(response);

      setUserData(userData);
      setIsFetching(false);
    });
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData, routeUserId]);

  const headingTitle = fullName ? `User: ${fullName}` : `User`;

  useDocumentTitle(headingTitle);

  const Loader = useMemo(() => <PageLoaderComponent />, []);

  const Content = useMemo(
    () => (
      <>
        <Row>
          <Column xl={8} withPaddings>
            <UserDetailsBasicInfoComponent />
          </Column>
          <Column xl={4} withPaddings>
            <UserProgramPartnerComponent />
          </Column>
        </Row>
        <Row>
          <Column withPaddings>
            <UserEventsAccessComponent />
          </Column>
        </Row>
        <Row>
          <Column withPaddings>
            <UserTransactionsComponent />
          </Column>
        </Row>
      </>
    ),
    []
  );

  return (
    <div className="event_details">
      <HeadingComponent title={headingTitle} subtitle={"Details"} />
      <BreadcrumbsComponent
        isLoading={isFetching}
        breadcrumbs={userBreadcrumbsHelper.getDetailsBreadcrumbs(
          breadcrumbsParams
        )}
      />
      {isFetching ? Loader : Content}
    </div>
  );
};

export default UserDetailsComponent;
