import React, { FC } from "react";
import PaginationComponent from "../pagination.component";

type ListingPaginationProps = {
  page: number;
  pageSize: number;
  totalCount: number;
  onPageChange: (page: number) => void;
  isVisible?: boolean;
  isDisabled?: boolean;
};

const ListingPaginationComponent: FC<ListingPaginationProps> = (props) => {
  const minimumShownItemIndex = (props.page - 1) * props.pageSize + 1;
  const maximumShownItemIndex =
    (props.page - 1) * props.pageSize + props.pageSize;

  if (!props.isVisible) {
    return null;
  }

  return (
    <div className="listing_pagination">
      <div className="listing_pagination__description">{`Showing from ${minimumShownItemIndex} to ${maximumShownItemIndex} of ${props.totalCount} records`}</div>
      <PaginationComponent
        currentPage={props.page}
        pageSize={props.pageSize}
        onPageChange={props.onPageChange}
        totalCount={props.totalCount}
        isDisabled={props.isDisabled}
      />
    </div>
  );
};

ListingPaginationComponent.defaultProps = {
  isVisible: true,
};

export default ListingPaginationComponent;
