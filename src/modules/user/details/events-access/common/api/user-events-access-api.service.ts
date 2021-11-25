import faker from "faker";
import UserDetailsAvailableEventPackage from "../types/user-details-available-event-package";
import UserEventAccessAvailableEventPackagesResponse from "./user-event-access-available-event-packages.response";
import UserEventAccessAvailableEventsResponse, {
  UserEventAccessAvailableEventsResponseItem,
} from "./user-event-access-available-events.response";
import UserDetailsEventAccessListResponse, {
  UserEventAccessResponseListItem,
} from "./user-event-access-list.response";

const fetchEventAccessList =
  (): Promise<UserDetailsEventAccessListResponse> => {
    const response: UserDetailsEventAccessListResponse = [];

    for (let i = 0; i < 20; i++) {
      const newEventAccess: UserEventAccessResponseListItem = {
        event: {
          id: faker.datatype.uuid(),
          title: faker.lorem.sentence(3),
          type: faker.random.arrayElement(["LIVE", "VOD"]),
        },
        validity: {
          from: faker.date.past().toJSON(),
          to: faker.date.past().toJSON(),
        },
      };

      response.push(newEventAccess);
    }

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(response);
      }, 1500);
    });
  };

const getFakeEventPackages = (
  qty: number
): UserDetailsAvailableEventPackage[] => {
  const packages: UserDetailsAvailableEventPackage[] = [];
  for (let i = 0; i < qty; i++) {
    const newPackage: UserDetailsAvailableEventPackage = {
      id: faker.datatype.uuid(),
      name: faker.lorem.sentence(3),
    };
    packages.push(newPackage);
  }

  return packages;
};

const fetchAvailableEventsList =
  (): Promise<UserEventAccessAvailableEventsResponse> => {
    const maxPackages = 3;
    const packagesNumber = Math.floor(Math.random() * maxPackages);
    const response: UserEventAccessAvailableEventsResponse = [];

    for (let i = 0; i < 20; i++) {
      const newAvailableEvent: UserEventAccessAvailableEventsResponseItem = {
        id: faker.datatype.uuid(),
        title: faker.lorem.sentence(3),
        type: faker.random.arrayElement(["LIVE", "VOD"]),
        packages: getFakeEventPackages(packagesNumber),
      };

      response.push(newAvailableEvent);
    }

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(response);
      }, 1500);
    });
  };

const fetchAvailableEventPackages =
  (): Promise<UserEventAccessAvailableEventPackagesResponse> => {
    const maxPackages = 3;
    const packagesNumber = Math.floor(Math.random() * maxPackages);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(getFakeEventPackages(packagesNumber));
      }, 1500);
    });
  };

const userEventsAccessApiService = {
  fetchEventAccessList,
  fetchAvailableEventsList,
  fetchAvailableEventPackages,
};

export default userEventsAccessApiService;
