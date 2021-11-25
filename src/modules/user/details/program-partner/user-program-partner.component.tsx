import { faHandshake } from "@fortawesome/free-solid-svg-icons";
import { FC, useEffect, useState } from "react";
import CardComponent from "../../../../common/components/card/card.component";
import FormFieldComponent from "../../../../common/components/form/field/form-field.component";
import userDetailsApiService from "../common/api/user-details-api.service";

const UserProgramPartnerComponent: FC = () => {
  const [totalPurchases, setTotalPurchases] = useState(0);
  const [code, setCode] = useState("");
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    setIsFetching(true);
    userDetailsApiService.fetchProgramPartner().then((response) => {
      setTotalPurchases(response.totalPurchases);
      setCode(response.code);
      setIsFetching(false);
    });
  }, []);

  return (
    <CardComponent
      header={{ title: "Program Partner", icon: faHandshake }}
      isLoading={isFetching}
    >
      <FormFieldComponent label="Code">{code}</FormFieldComponent>
      <FormFieldComponent label="Total purchases">
        {totalPurchases}
      </FormFieldComponent>
    </CardComponent>
  );
};

export default UserProgramPartnerComponent;
