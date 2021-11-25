import { EventType } from "../../../../../../shared/event/badge/event-type-badge.component";


type UserDetailsEventAccess = {
  event: {
    id: string;
    title: string;
    type: EventType;
  };
  validity: {
    from: Date;
    to?: Date;
  };
};

export default UserDetailsEventAccess;
