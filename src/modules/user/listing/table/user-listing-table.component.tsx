import { useMemo, FC } from "react";
import BadgeComponent from "../../../../common/components/badge/badge.component";
import TableNavLinkComponent from "../../../../common/components/table/nav-link/table-nav-link.component";
import TableComponent from "../../../../common/components/table/table.component";
import TableRow from "../../../../common/components/table/types/table-row";
import dateService from "../../../../common/utils/date/date.service";
import userRoutesHelper from "../../common/routes/user-routes.helper";
import UserListingItem from "../common/types/user-listing-item";
import UserListingTableColumn from "../common/types/user-listing-table-column";
import UserListingTableColumnAccessors from "../common/types/user-listing-table-column-accessors";

type UserListingTableProps = {
  users: UserListingItem[];
  isLoading: boolean;
  sortKey: string | undefined;
  setSortKey: (sortKey: string | undefined) => void;
};

const UserListingTableComponent: FC<UserListingTableProps> = (props) => {
  const tableColumns: UserListingTableColumn[] = useMemo(
    () => [
      {
        header: "ID",
        accessor: "id",
        colSpan: 1,
        sortDescKey: "idDesc",
        sortAscKey: "idAsc",
      },
      {
        header: "Email",
        accessor: "email",
        colSpan: 2,
        sortDescKey: "emailDesc",
        sortAscKey: "emailAsc",
      },
      { header: "Name", accessor: "name", colSpan: 2 },
      {
        header: "Created",
        accessor: "createdAt",
        colSpan: 2,
        sortDescKey: "createdAtDesc",
        sortAscKey: "createdAtAsc",
      },
      { header: "Active", accessor: "isActive", colSpan: 1 },
    ],
    []
  );

  const tableRows: TableRow<UserListingTableColumnAccessors>[] =
    props.users.map((user) => {
      return {
        id: String(user.id),
        value: {
          id: (
            <TableNavLinkComponent
              to={
                userRoutesHelper.getDetailsRoute({ id: String(user.id) }) ?? ""
              }
            >
              {user.id}
            </TableNavLinkComponent>
          ),
          email: <>{user.email}</>,
          name: <>{`${user.firstName} ${user.lastName}`}</>,
          createdAt: <>{dateService.getDateTimeString(user.createdAt)}</>,
          isActive: (
            <BadgeComponent type={user.isActive ? "success" : "danger"}>
              {user.isActive ? "Active" : "Inactive"}
            </BadgeComponent>
          ),
        },
      };
    });

  return (
    <TableComponent
      columns={tableColumns}
      rows={tableRows}
      isLoading={props.isLoading}
      sortKey={props.sortKey}
      onSortKeyChange={props.setSortKey}
    />
  );
};

export default UserListingTableComponent;
