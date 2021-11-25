import { FC } from "react";
import BadgeComponent, {
  BadgeType,
} from "../../../../common/components/badge/badge.component";
import TransactionStatus from "../../../../common/types/transaction-status";

type TransactionStatusBadgeProps = {
  status: TransactionStatus;
};

const TransactionStatusBadgeComponent: FC<TransactionStatusBadgeProps> = (
  props
) => {
  const badgeOptions: {
    status: TransactionStatus;
    badgeType: BadgeType;
  }[] = [
    { status: "CANCELLED", badgeType: "danger" },
    { status: "FAILED", badgeType: "danger" },
    { status: "REFUSED", badgeType: "danger" },
    { status: "PENDING", badgeType: "warning" },
    { status: "CHARGED", badgeType: "success" },
  ];

  const currentBadge = badgeOptions.find(
    (option) => option.status === props.status
  );

  return (
    <BadgeComponent type={currentBadge?.badgeType}>
      {props.status}
    </BadgeComponent>
  );
};

export default TransactionStatusBadgeComponent;
