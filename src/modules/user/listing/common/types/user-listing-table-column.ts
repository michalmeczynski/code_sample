import TableColumn from "../../../../../common/components/table/types/table-column";
import UserListingSortKey from "../../common/types/user-listing-sort-key";
import UserListingTableColumnAccessors from "./user-listing-table-column-accessors";

type UserListingTableColumn = TableColumn<
  UserListingTableColumnAccessors,
  UserListingSortKey
>;

export default UserListingTableColumn;
