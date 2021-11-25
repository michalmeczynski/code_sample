
import { EventType } from "../../../../../../shared/event/badge/event-type-badge.component";
import UserDetailsAvailableEventPackage from "./user-details-available-event-package";

type UserDetailsAvailableEvent = {
  id: string;
  title: string;
  type: EventType;
  packages: UserDetailsAvailableEventPackage[];
};

export default UserDetailsAvailableEvent;
