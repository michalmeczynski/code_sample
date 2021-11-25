import { EventType } from "../../../../../../shared/event/badge/event-type-badge.component";


export type UserEventAccessResponseListItem = {
  event: {
    id: string;
    title: string;
    type: EventType;
  };
  validity: {
    from: string;
    to: string | null;
  };
};

type UserDetailsEventAccessListResponse = UserEventAccessResponseListItem[];

export default UserDetailsEventAccessListResponse;
