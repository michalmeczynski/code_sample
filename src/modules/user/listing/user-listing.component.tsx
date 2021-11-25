import { FC, useCallback, useEffect, useState } from "react";
import BreadcrumbsComponent from "../../../common/components/breadcrumbs/breadcrumbs.component";
import CardButtonComponent from "../../../common/components/card/button/card-button.component";
import CardComponent from "../../../common/components/card/card.component";
import Column from "../../../common/components/grid/column";
import Row from "../../../common/components/grid/row";
import HeadingComponent from "../../../common/components/heading/heading.component";
import userBreadcrumbsHelper from "../common/breadcrumbs/user-breadcrumbs.helper";
import userListingApiService from "./common/api/user-listing-api.service";
import UserListingFilters from "./common/types/user-listing-filters";
import UserListingItem from "./common/types/user-listing-item";
import UserListingFiltersComponent from "./filters/user-listing-filters.component";
import UserListingTableComponent from "./table/user-listing-table.component";
import { isEqual, isEmpty } from "lodash";
import usePagination from "../../../common/hooks/use-pagination";
import CardRefreshButtonComponent from "../../../common/components/card/button/refresh/card-refresh-button.component";
import Icon from "../../../common/components/icons/icon";
import useDocumentTitle from "../../../common/hooks/use-document-title";
import ListingPaginationComponent from "../../../common/components/pagination/listing/listing-pagination.component";

type UserListingProps = {};

const UserListingComponent: FC<UserListingProps> = () => {
  const defaultFilters: UserListingFilters = {};
  const [isFetching, setIsFetching] = useState(false);
  const [filters, setFilters] = useState<UserListingFilters>(defaultFilters);
  const [previousFilters, setPreviousFilters] =
    useState<UserListingFilters>(defaultFilters);
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  const [users, setUsers] = useState<UserListingItem[]>([]);
  const [totalUsersCount, setTotalUsersCount] = useState(0);
  const [sortKey, setSortKey] = useState<string | undefined>("createdAtDesc");
  const { page, pageSize, setPage } = usePagination({
    totalResults: totalUsersCount,
  });

  useDocumentTitle(`Users Listing`);

  const fetchListing = useCallback(
    (
      filters: UserListingFilters,
      page: number,
      pageSize: number,
      sortKey: string | undefined
    ) => {
      setIsFetching(true);

      userListingApiService
        .fetchListing()
        .then((response) => {
          setUsers(response.users);
          setTotalUsersCount(response.totalCount);
        })
        .finally(() => {
          setIsFetching(false);
        });
    },
    []
  );

  useEffect(() => {
    fetchListing(filters, page, pageSize, sortKey);
  }, [fetchListing, sortKey, page, pageSize]);

  const clearFilters = useCallback(() => {
    if (Object.keys(filters) === Object.keys(defaultFilters)) {
      return;
    }
    setFilters(defaultFilters);
    setPreviousFilters(defaultFilters);
    fetchListing(filters, page, pageSize, sortKey);
  }, [fetchListing]);

  const applyFilters = useCallback(() => {
    setPreviousFilters({ ...filters });
    fetchListing(filters, page, pageSize, sortKey);
  }, [fetchListing, filters]);

  const isLastUsedFilters = isEqual(filters, previousFilters);
  const isApplyFiltersButtonDisabled = isLastUsedFilters;

  const isFiltersEmpty = isEmpty(filters);
  const isClearFiltersButtonDisabled = isFiltersEmpty;

  const isPaginationVisible = !!users.length;

  return (
    <div className="user_listing">
      <HeadingComponent title="Users" />
      <BreadcrumbsComponent
        breadcrumbs={userBreadcrumbsHelper.getListingBreadcrumbs()}
      />
      <Row>
        <Column>
          <CardComponent
            header={{
              title: "List",
              subtitle: totalUsersCount
                ? `Total results: ${totalUsersCount}`
                : undefined,
              actions: [
                <CardRefreshButtonComponent
                  onClick={() => fetchListing(filters, page, pageSize, sortKey)}
                />,
                <CardButtonComponent
                  onClick={() => setIsFiltersVisible((curr) => !curr)}
                  icon={Icon.filter}
                  title={isFiltersVisible ? `Hide filters` : `Show filters`}
                />,
              ],
            }}
          >
            <UserListingFiltersComponent
              isVisible={isFiltersVisible}
              filters={filters}
              onFiltersChange={setFilters}
              onApplyFiltersClick={applyFilters}
              onClearFiltersClick={clearFilters}
              isApplyFiltersButtonDisabled={isApplyFiltersButtonDisabled}
              isClearFiltersButtonDisabled={isClearFiltersButtonDisabled}
            />
            <UserListingTableComponent
              users={users}
              isLoading={isFetching}
              sortKey={sortKey}
              setSortKey={setSortKey}
            />
            <ListingPaginationComponent
              isVisible={isPaginationVisible}
              page={page}
              pageSize={pageSize}
              onPageChange={setPage}
              totalCount={totalUsersCount}
              isDisabled={isFetching}
            />
          </CardComponent>
        </Column>
      </Row>
    </div>
  );
};

export default UserListingComponent;
