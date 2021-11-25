import React, {
  useState,
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import InputComponent from "../form/input/input.component";
import Calendar, { Detail } from "react-calendar";
import {
  faCalendarAlt,
  faAngleLeft,
  faAngleRight,
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faTimes,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import OutsideClickHandler from "react-outside-click-handler";
import FormIcon from "../icons/form-icon";
import ButtonComponent from "../button/button.component";
import classNames from "classnames";
import FormFieldComponent from "../form/field/form-field.component";
import useKeyboardPress from "../../hooks/use-keyboard-press";

type DateTimePickerMode = "Date" | "Time";
type DateTimePickerPosition = "bottom" | "top";

type DateTimePickerProps = {
  date: Date | undefined;
  onChange: (date: Date | undefined) => void;
  minDate?: Date;
  maxDate?: Date;
  onBlur?: () => void;
  hasError?: boolean;
  position?: DateTimePickerPosition;
};

const DateTimePickerComponent: FC<DateTimePickerProps> = (props) => {
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);
  const [activeMode, setActiveMode] = useState<DateTimePickerMode>("Date");
  const hourInputRef = useRef<HTMLInputElement>(null);
  const datePickerOverlay = useRef<HTMLDivElement>(null);

  useKeyboardPress({
    Escape: () => setIsCalendarVisible(false),
    Tab: () => setIsCalendarVisible(false),
  });

  useEffect(() => {
    datePickerOverlay.current?.focus();
  }, [isCalendarVisible]);

  useEffect(() => {
    if (activeMode === "Time") {
      hourInputRef.current?.focus();
    }
  }, [activeMode]);

  const getNavigationLabel = useCallback(
    (data: { date: Date; view: Detail; label: string }): string => {
      return `${data.label.slice(0, 3)} ${getYearFormLabel(data.label)}`;
    },
    []
  );

  const getYearFormLabel = (label: string) => {
    return label.replace(/^\D+/g, "");
  };

  const DatePickerIcon = ({ icon }: { icon: IconProp }) => (
    <FontAwesomeIcon size="sm" icon={icon} />
  );

  const DateModeButton = useMemo(() => {
    const isActive = activeMode === "Date";
    return (
      <ButtonComponent
        onClick={() => setActiveMode("Date")}
        classNames={{
          root: classNames(
            `date_time_picker_selector_mode__button`,
            isActive && `active`
          ),
        }}
      >
        <FontAwesomeIcon
          size="lg"
          icon={faCalendarAlt}
          className="date_time_picker_selector_mode__button__icon"
        />
        <div className="date_time_picker_selector_mode__button__title">
          Date
        </div>
      </ButtonComponent>
    );
  }, [activeMode]);

  const TimeModeButton = useMemo(() => {
    const isActive = activeMode === "Time";
    const isDisabled = props.date === undefined;
    return (
      <ButtonComponent
        onClick={() => setActiveMode("Time")}
        classNames={{
          root: classNames(
            `date_time_picker_selector_mode__button`,
            isActive && `active`
          ),
        }}
        isDisabled={isDisabled}
        title={isDisabled ? `Select date to enable time mode` : undefined}
      >
        <FontAwesomeIcon
          size="lg"
          icon={faClock}
          className="date_time_picker_selector_mode__button__icon"
        />
        <div className="date_time_picker_selector_mode__button__title">
          Time
        </div>
      </ButtonComponent>
    );
  }, [activeMode, props.date]);

  const hour = props.date?.getHours();
  const minutes = props.date?.getMinutes();
  const seconds = props.date?.getSeconds();

  const onDateChange = (date: Date | Date[]) => {
    if (!(date instanceof Date)) {
      return;
    }

    if (props.date) {
      date.setHours(props.date.getHours());
      date.setMinutes(props.date.getMinutes());
      date.setSeconds(props.date.getSeconds());
      props.onChange(date);

      return;
    }

    props.onChange(date);
  };

  const changeHours = useCallback(
    (hourAsString: string) => {
      const hour = Number(hourAsString);

      if (!props.date) {
        return;
      }

      const newDate = new Date(props.date);
      newDate.setHours(hour);

      props.onChange(newDate);
    },
    [props]
  );

  const changeMinutes = useCallback(
    (minutesAsString: string) => {
      const minutes = Number(minutesAsString);

      if (!props.date) {
        return;
      }

      const newDate = new Date(props.date);

      if (minutes > 60) {
        return;
      }

      if (minutes === 60) {
        newDate.setHours(newDate.getHours() + 1);
        newDate.setMinutes(0);
        props.onChange(newDate);
        return;
      }

      newDate.setMinutes(minutes);
      props.onChange(newDate);
    },
    [props]
  );

  const changeSeconds = useCallback(
    (secondsAsString: string) => {
      const seconds = Number(secondsAsString);

      if (!props.date) {
        return;
      }

      const newDate = new Date(props.date);

      if (seconds > 60) {
        return;
      }

      if (seconds === 60) {
        newDate.setMinutes(newDate.getMinutes() + 1);
        newDate.setSeconds(0);
        props.onChange(newDate);
        return;
      }

      newDate.setSeconds(seconds);
      props.onChange(newDate);
    },
    [props]
  );

  const getComponentByMode = useCallback(() => {
    switch (activeMode) {
      case "Date":
        return (
          <Calendar
            locale="en"
            minDate={props.minDate}
            maxDate={props.maxDate}
            navigationLabel={getNavigationLabel}
            prev2Label={<DatePickerIcon icon={faAngleDoubleLeft} />}
            prevLabel={<DatePickerIcon icon={faAngleLeft} />}
            nextLabel={<DatePickerIcon icon={faAngleRight} />}
            next2Label={<DatePickerIcon icon={faAngleDoubleRight} />}
            className="date_time_picker_calendar"
            value={props.date}
            onChange={onDateChange}
          />
        );
      case "Time":
        return (
          <div className="date_time_picker_clock">
            <div className="date_time_picker_clock__content">
              <FormFieldComponent label="Hour">
                <InputComponent
                  inputRef={hourInputRef}
                  value={String(hour).padStart(2, "0")}
                  onChange={changeHours}
                  type="number"
                  placeholder="Hour"
                  classNames={{ root: "date_time_picker_clock__input" }}
                />
              </FormFieldComponent>
              <FormFieldComponent label="Min">
                <InputComponent
                  value={String(minutes).padStart(2, "0")}
                  onChange={changeMinutes}
                  type="number"
                  placeholder="Minutes"
                  classNames={{ root: "date_time_picker_clock__input" }}
                />
              </FormFieldComponent>
              <FormFieldComponent label="Sec">
                <InputComponent
                  value={String(seconds).padStart(2, "0")}
                  onChange={changeSeconds}
                  type="number"
                  placeholder="Seconds"
                  classNames={{ root: "date_time_picker_clock__input" }}
                />
              </FormFieldComponent>
            </div>
          </div>
        );
      default:
        return null;
    }
  }, [
    activeMode,
    props,
    hour,
    changeHours,
    minutes,
    changeMinutes,
    seconds,
    changeSeconds,
    getNavigationLabel,
  ]);

  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        setIsCalendarVisible(false);
        setActiveMode("Date");
      }}
    >
      <div className="date_time_picker" ref={datePickerOverlay}>
        {isCalendarVisible && (
          <div
            className={classNames("date_time_picker_selector", props.position)}
          >
            <div className="date_time_picker_selector_mode">
              {DateModeButton}
              {TimeModeButton}
            </div>
            {getComponentByMode()}
          </div>
        )}
        <InputComponent
          onFocus={() => setIsCalendarVisible(true)}
          value={
            props.date
              ? `${props.date.toLocaleDateString()} ${props.date.toLocaleTimeString()}`
              : ``
          }
          placeholder="Select date"
          isReadOnly={true}
          iconLeft={<FormIcon icon={faCalendarAlt} />}
          iconRight={
            props.date && (
              <FormIcon
                icon={faTimes}
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

DateTimePickerComponent.defaultProps = {
  position: "bottom",
};

export default DateTimePickerComponent;
