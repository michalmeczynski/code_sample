import { ReactNode, FC } from "react";
import Icon from "../../../../../common/components/icons/icon";
import TableActionsContainerComponent from "../../../../../common/components/table/actions-container/table-actions-container.component";
import TableDeleteButtonComponent from "../../../../../common/components/table/button/delete/table-delete-button.component";
import TableButtonComponent from "../../../../../common/components/table/button/table-button.component";
import TableNavLinkComponent from "../../../../../common/components/table/nav-link/table-nav-link.component";
import TableComponent from "../../../../../common/components/table/table.component";
import TableColumn from "../../../../../common/components/table/types/table-column";
import TableRow from "../../../../../common/components/table/types/table-row";
import dateService from "../../../../../common/utils/date/date.service";
import EventTypeBadgeComponent, { EventType } from "../../../../../shared/event/badge/event-type-badge.component";
import UserDetailsEventAccess from "../common/types/user-details-event-access";

type TableColumnAccessors = {
  title: ReactNode;
  type: ReactNode;
  accessFrom: ReactNode;
  accessTo: ReactNode;
  actions: ReactNode;
};

type UserEventsAccessTableProps = {
  isLoading: boolean;
  eventAccess: UserDetailsEventAccess[];
  onEditButtonClick: (event: UserDetailsEventAccess) => void;
  onDeleteButtonClick: (event: UserDetailsEventAccess) => void;
};

const UserEventsAccessTableComponent: FC<UserEventsAccessTableProps> = (
  props
) => {
  const tableColumns: TableColumn<TableColumnAccessors>[] = [
    {
      header: "Title",
      accessor: "title",
      colSpan: 3,
    },
    {
      header: "Type",
      accessor: "type",
      colSpan: 1,
    },
    {
      header: "Access From",
      accessor: "accessFrom",
      colSpan: 2,
    },
    {
      header: "Access To",
      accessor: "accessTo",
      colSpan: 2,
    },
    {
      header: "Actions",
      accessor: "actions",
      colSpan: 1,
    },
  ];

  const TitleCell = ({ id, title }: { id: string; title: string }) => {
    return (
      <TableNavLinkComponent to={"#"}>
        {title}
      </TableNavLinkComponent>
    );
  };

  const TypeCell = ({ type }: { type: EventType }) => {
    return <EventTypeBadgeComponent eventType={type} />;
  };

  const AccessDateCell = ({ date }: { date: Date | undefined }) => {
    return <>{date ? dateService.getDateTimeString(date) : `Undefined`}</>;
  };

  const ActionsCell = ({
    event: eventAccess,
  }: {
    event: UserDetailsEventAccess;
  }) => {
    return (
      <TableActionsContainerComponent>
        <TableButtonComponent
          onClick={() => props.onEditButtonClick(eventAccess)}
          icon={Icon.edit}
          type="brand"
          title={`Edit`}
        />
        <TableDeleteButtonComponent
          onClick={() => props.onDeleteButtonClick(eventAccess)}
        />
      </TableActionsContainerComponent>
    );
  };

  const tableRows: TableRow<TableColumnAccessors>[] = props.eventAccess.map(
    (eventAccess) => {
      return {
        id: String(eventAccess.event.id),
        value: {
          title: (
            <TitleCell
              id={eventAccess.event.id}
              title={eventAccess.event.title}
            />
          ),
          type: <TypeCell type={eventAccess.event.type} />,
          accessFrom: <AccessDateCell date={eventAccess.validity.from} />,
          accessTo: <AccessDateCell date={eventAccess.validity.to} />,
          actions: <ActionsCell event={eventAccess} />,
        },
      };
    }
  );

  return (
    <TableComponent
      columns={tableColumns}
      rows={tableRows}
      isLoading={props.isLoading}
    />
  );
};

export default UserEventsAccessTableComponent;
