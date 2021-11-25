import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { useCallback, useEffect, useState } from "react";
import CardComponent from "../../../../common/components/card/card.component";
import UserDetailsEventAccess from "./common/types/user-details-event-access";
import userEventsAccessApiService from "./common/api/user-events-access-api.service";
import UserEventsAccessTableComponent from "./table/user-events-access-table.component";
import userEventAccessFactory from "./common/factory/user-event-access.factory";
import UserDetailsEventAccessDeleteComponent from "./delete/user-details-event-access-delete.component";
import UserEventsAccessAddComponent from "./add/user-events-access-add.component";
import UserEventsAccessEditComponent from "./edit/user-events-access-edit.component";
import CardRefreshButtonComponent from "../../../../common/components/card/button/refresh/card-refresh-button.component";
import CardAddButtonComponent from "../../../../common/components/card/button/add/card-add-button.component";

const UserEventsAccessComponent = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [accessList, setAccessList] = useState<UserDetailsEventAccess[]>([]);
  const [isAddNewAccessAsideOpen, setIsAddNewAccessAsideOpen] = useState(false);
  const [isEditAccessModalOpen, setIsEditAccessModalOpen] = useState(false);
  const [isDeleteAccessModalOpen, setIsDeleteAccessModalOpen] = useState(false);
  const [selectedEventAccess, setSelectedEventAccess] = useState<
    UserDetailsEventAccess | undefined
  >(undefined);

  const fetchEventAccessList = useCallback(() => {
    setIsFetching(true);
    userEventsAccessApiService.fetchEventAccessList().then((response) => {
      const eventAccessList =
        userEventAccessFactory.getUserEventAccessList(response);
      setAccessList(eventAccessList);
      setIsFetching(false);
    });
  }, []);

  const totalResults = accessList.length;

  useEffect(() => {
    fetchEventAccessList();
  }, [fetchEventAccessList]);

  const onEditButtonClick = (eventAccess: UserDetailsEventAccess) => {
    setSelectedEventAccess(eventAccess);
    openEditAside();
  };

  const onDeleteButtonClick = (eventAccess: UserDetailsEventAccess) => {
    setSelectedEventAccess(eventAccess);
    openDeleteModal();
  };

  const onDeleteSuccess = () => {
    const filteredAccessList = accessList.filter(
      (access) => access.event.id !== selectedEventAccess?.event.id
    );
    setAccessList(filteredAccessList);

    closeDeleteModal();
  };

  const openAddAside = () => {
    setIsAddNewAccessAsideOpen(true);
  };

  const closeAddAside = () => {
    setIsAddNewAccessAsideOpen(false);
  };

  const openEditAside = () => {
    setIsEditAccessModalOpen(true);
  };

  const closeEditAside = () => {
    setIsEditAccessModalOpen(false);
  };

  const openDeleteModal = () => {
    setIsDeleteAccessModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteAccessModalOpen(false);
  };

  const onAddNewEventAccessSuccess = (
    newEventAccess: UserDetailsEventAccess
  ) => {
    closeAddAside();
    setAccessList([...accessList, newEventAccess]);
  };

  return (
    <>
      <CardComponent
        header={{
          title: "Event Access",
          subtitle: `Total: ${totalResults}`,
          icon: faCalendarAlt,
          actions: [
            <CardRefreshButtonComponent onClick={fetchEventAccessList} />,
            <CardAddButtonComponent onClick={openAddAside} />,
          ],
        }}
      >
        <UserEventsAccessTableComponent
          isLoading={isFetching}
          eventAccess={accessList}
          onEditButtonClick={onEditButtonClick}
          onDeleteButtonClick={onDeleteButtonClick}
        />
      </CardComponent>
      <UserEventsAccessAddComponent
        isOpen={isAddNewAccessAsideOpen}
        onClose={closeAddAside}
        onAddNewEventAccessSuccess={onAddNewEventAccessSuccess}
      />

      <UserEventsAccessEditComponent
        isOpen={isEditAccessModalOpen}
        onClose={closeEditAside}
        eventAccess={selectedEventAccess}
      />
      <UserDetailsEventAccessDeleteComponent
        isOpen={isDeleteAccessModalOpen}
        onClose={closeDeleteModal}
        eventAccess={selectedEventAccess}
        onDeleteSuccess={onDeleteSuccess}
      />
    </>
  );
};

export default UserEventsAccessComponent;
