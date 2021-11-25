import React, { useState, FC } from "react";
import InputComponent from "../form/input/input.component";
import Calendar, { Detail } from "react-calendar";
import {
  faCalendarAlt,
  faAngleLeft,
  faAngleRight,
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import OutsideClickHandler from "react-outside-click-handler";
import FormIcon from "../icons/form-icon";
import classNames from "classnames";
import useKeyboardPress from "../../hooks/use-keyboard-press";

type DatePickerPosition = "bottom" | "top";

type DatePickerProps = {
  date: Date | undefined;
  onChange: (date: Date | undefined) => void;
  minDate?: Date;
  maxDate?: Date;
  onBlur?: () => void;
  hasError?: boolean;
  position?: DatePickerPosition;
  placeholder?: string;
};

const DatePickerComponent: FC<DatePickerProps> = (props) => {
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);

  useKeyboardPress({
    Escape: () => setIsCalendarVisible(false),
    Tab: () => setIsCalendarVisible(false),
  });

  const getNavigationLabel = (data: {
    date: Date;
    view: Detail;
    label: string;
  }): string => {
    return `${data.label.slice(0, 3)} ${getYearFormLabel(data.label)}`;
  };

  const getYearFormLabel = (label: string) => {
    return label.replace(/^\D+/g, "");
  };

  const DatePickerIcon = ({ icon }: { icon: IconProp }) => (
    <FontAwesomeIcon size="sm" icon={icon} />
  );

  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        setIsCalendarVisible(false);
      }}
    >
      <div className="date_picker">
        {isCalendarVisible && (
          <div className={classNames("date_picker_selector", props.position)}>
            <Calendar
              locale="en"
              minDate={props.minDate}
              maxDate={props.maxDate}
              navigationLabel={getNavigationLabel}
              prev2Label={<DatePickerIcon icon={faAngleDoubleLeft} />}
              prevLabel={<DatePickerIcon icon={faAngleLeft} />}
              nextLabel={<DatePickerIcon icon={faAngleRight} />}
              next2Label={<DatePickerIcon icon={faAngleDoubleRight} />}
              className="date_picker_calendar"
              value={props.date}
              onChange={(date: Date | Date[]) => {
                if (date instanceof Date) {
                  props.onChange(date);
                  setIsCalendarVisible(false);
                }
              }}
            />
          </div>
        )}
        <InputComponent
          onFocus={() => setIsCalendarVisible(true)}
          value={props.date ? `${props.date.toLocaleDateString()}` : ``}
          placeholder={props.placeholder!}
          isReadOnly={true}
          iconLeft={<FormIcon icon={faCalendarAlt} />}
          iconRight={
            props.date && (
              <FormIcon
                icon={faTimes}
                title={"Clear date"}
                onClick={(e) => {
                  e.preventDefault();
                  props.onChange(undefined);
                }}
              />
            )
          }
          hasError={props.hasError}
        />
      </div>
    </OutsideClickHandler>
  );
};

DatePickerComponent.defaultProps = {
  position: "bottom",
  placeholder: "Select date",
};

export default DatePickerComponent;
