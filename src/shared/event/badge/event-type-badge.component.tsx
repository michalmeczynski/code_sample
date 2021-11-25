import classNames from "classnames";
import BadgeComponent from "../../../common/components/badge/badge.component";

export type EventType = "LIVE" | "VOD";

const EventTypeBadgeComponent = ({ eventType }: { eventType: EventType }) => {
  const badgeOptions: { eventType: EventType; className: string }[] = [
    { eventType: "LIVE", className: "live" },
    { eventType: "VOD", className: "vod" },
  ];

  const currentBadge = badgeOptions.find(
    (option) => option.eventType === eventType
  );

  return (
    <BadgeComponent
      classNames={{
        root: classNames("event_type_badge", currentBadge?.className),
      }}
    >
      {currentBadge?.eventType}
    </BadgeComponent>
  );
};

export default EventTypeBadgeComponent;
