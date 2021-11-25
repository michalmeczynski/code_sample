import classNames from "classnames";
import { FC } from "react";
import BadgeComponent from "../../../../common/components/badge/badge.component";
import TransactionProvider from "../../../../common/types/transaction-provider";

type TransactionProviderBadgeProps = {
  providerName: TransactionProvider;
};

const TransactionProviderBadgeComponent: FC<TransactionProviderBadgeProps> = (
  props
) => {
  const badgeOptions: {
    provider: TransactionProvider;
    className: string;
  }[] = [
    { provider: "BLUEMEDIA", className: "bluemedia" },
    { provider: "PAYPAL", className: "paypal" },
  ];

  const currentBadge = badgeOptions.find(
    (option) => option.provider === props.providerName
  );

  return (
    <BadgeComponent
      classNames={{
        root: classNames("transaction_provider_badge", currentBadge?.className),
      }}
    >
      {props.providerName}
    </BadgeComponent>
  );
};

export default TransactionProviderBadgeComponent;
