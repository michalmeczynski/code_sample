import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import React, { FC, ReactNode, useState } from "react";
import useIsMobile from "../../hooks/use-is-mobile";
import InputComponent from "../form/input/input.component";

type PaginationProps = {
  currentPage: number;
  pageSize: number;
  totalCount: number;
  onPageChange: (page: number) => void;
  isDisabled?: boolean;
};

const PaginationComponent: FC<PaginationProps> = (props) => {
  const maxPage = Math.ceil(props.totalCount / props.pageSize);
  const isMobile = useIsMobile();
  const offset = isMobile ? 0 : 2;
  const shouldRenderPrevDotsButton =
    props.currentPage - offset >= 1 && !isMobile;
  const shouldRenderNextDotsButton =
    props.currentPage + offset <= maxPage - 1 && !isMobile;
  const [manualPageValue, setManualPageValue] = useState(0);

  const sortNumbers = (arrayOfNumbers: number[]) => {
    return arrayOfNumbers.sort((a, b) => a - b);
  };

  const generatePageNumberToRender = () => {
    const pages: number[] = [];

    if (props.currentPage < offset + 1) {
      for (let i = 1; i <= 2 * offset; i++) {
        pages.push(i);
        if (i === maxPage) {
          break;
        }
      }

      return sortNumbers(pages);
    }

    if (props.currentPage >= maxPage - offset) {
      for (let i = 0; i <= offset + 1; i++) {
        pages.push(maxPage - i);
        if (maxPage - i === 1) {
          break;
        }
      }

      return sortNumbers(pages);
    }

    const maxLeftItems = shouldRenderPrevDotsButton ? offset - 1 : offset;

    for (let i = 1; i <= maxLeftItems; i++) {
      const pageCandidate = props.currentPage - i;
      if (pageCandidate < 1) {
        break;
      }
      pages.push(pageCandidate);
    }

    pages.push(props.currentPage);

    const maxRightItems = shouldRenderNextDotsButton ? offset - 1 : offset;

    for (let i = 1; i <= maxRightItems; i++) {
      const pageCandidate = props.currentPage + i;

      if (pageCandidate > maxPage) {
        break;
      }
      pages.push(pageCandidate);
    }

    return sortNumbers(pages);
  };

  const pageNumbersToRender = generatePageNumberToRender();

  const onPrevButtonClick = () => {
    if (props.currentPage - 1 > 0) {
      props.onPageChange(props.currentPage - 1);
    }
  };

  const onPrevDotsButtonClick = () => {
    if (props.currentPage > maxPage - offset - 1) {
      props.onPageChange(
        props.currentPage - 2 * offset + (maxPage - props.currentPage)
      );
      return;
    }
    props.onPageChange(props.currentPage - offset);
  };

  const onNextButtonClick = () => {
    if (props.currentPage + 1 <= maxPage) {
      props.onPageChange(props.currentPage + 1);
    }
  };

  const onNextDotsButtonClick = () => {
    if (props.currentPage < offset + 1) {
      props.onPageChange(
        props.currentPage + 2 * offset - props.currentPage + 1
      );
      return;
    }
    props.onPageChange(props.currentPage + offset);
  };

  const onManualPageInputChange = (value: string) => {
    const numberFromString = Number(value);

    if (Number.isNaN(numberFromString)) {
      return;
    }

    const isManualPageValueInRange = numberFromString <= maxPage;

    if (!isManualPageValueInRange) {
      return;
    }

    setManualPageValue(numberFromString);
  };

  const onManualPageInputBlur = () => {
    const isManualPageValueInRange =
      manualPageValue > 0 && manualPageValue <= maxPage;

    if (!isManualPageValueInRange) {
      return;
    }

    props.onPageChange(manualPageValue);
    setManualPageValue(0);
  };

  const PageButton = ({
    children,
    onClick,
    isDisabled,
    className,
  }: {
    children: ReactNode;
    onClick: () => void;
    isDisabled?: boolean;
    className?: string;
  }) => {
    return (
      <button
        disabled={isDisabled}
        className={classNames("pagination_button", className)}
        onClick={onClick}
      >
        {children}
      </button>
    );
  };

  const PageButtonIcon = ({ icon }: { icon: IconProp }) => {
    return (
      <FontAwesomeIcon
        icon={icon}
        className="pagination_button__icon"
        size={"sm"}
      />
    );
  };

  const PrevPageButton = () => {
    return (
      <PageButton
        isDisabled={props.isDisabled || props.currentPage === 1}
        className="pagination_prev"
        onClick={onPrevButtonClick}
      >
        <PageButtonIcon icon={faChevronLeft} />
      </PageButton>
    );
  };

  const NextPageButton = () => {
    return (
      <PageButton
        isDisabled={props.isDisabled || props.currentPage === maxPage}
        className="pagination_next"
        onClick={onNextButtonClick}
      >
        <PageButtonIcon icon={faChevronRight} />
      </PageButton>
    );
  };

  const shouldRenderFirstPageButton = !pageNumbersToRender.includes(1);
  const shouldRenderLastPageButton = !pageNumbersToRender.includes(maxPage);

  return (
    <div className="pagination">
      <div className="pagination_go_to">
        <InputComponent
          value={manualPageValue ? String(manualPageValue) : ""}
          onChange={onManualPageInputChange}
          placeholder={"Page"}
          classNames={{
            root: "pagination_go_to_input",
            input: "pagination_go_to_input__input",
          }}
          isDisabled={props.isDisabled}
          onBlur={onManualPageInputBlur}
        />
      </div>
      <PrevPageButton />
      {shouldRenderFirstPageButton && (
        <PageButton
          isDisabled={props.isDisabled}
          onClick={() => props.onPageChange(1)}
        >
          1
        </PageButton>
      )}
      {shouldRenderPrevDotsButton && (
        <PageButton
          isDisabled={props.isDisabled}
          onClick={onPrevDotsButtonClick}
        >
          ...
        </PageButton>
      )}
      {pageNumbersToRender.map((pageNumber) => {
        const isActive = props.currentPage === pageNumber;
        return (
          <PageButton
            key={`select-page-${pageNumber}`}
            isDisabled={props.isDisabled}
            className={isActive ? "active" : undefined}
            onClick={() => props.onPageChange(pageNumber)}
          >
            {pageNumber}
          </PageButton>
        );
      })}
      {shouldRenderNextDotsButton && (
        <PageButton
          isDisabled={props.isDisabled}
          onClick={onNextDotsButtonClick}
        >
          ...
        </PageButton>
      )}
      {shouldRenderLastPageButton && (
        <PageButton
          isDisabled={props.isDisabled}
          onClick={() => props.onPageChange(maxPage)}
        >
          {maxPage}
        </PageButton>
      )}

      <NextPageButton />
    </div>
  );
};

export default PaginationComponent;
