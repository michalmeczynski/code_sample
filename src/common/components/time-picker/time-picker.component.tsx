import { faClock, faTimes } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import React, { useState, FC, useCallback } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import FormFieldComponent from "../form/field/form-field.component";
import InputComponent from "../form/input/input.component";
import FormIcon from "../icons/form-icon";

type TimePickerPosition = "bottom" | "top";

type TimePickerProps = {
  date: Date | undefined;
  onChange: (date: Date | undefined) => void;
  minDate?: Date;
  maxDate?: Date;
  onBlur?: () => void;
  hasError?: boolean;
  position?: TimePickerPosition;
};

const TimePickerComponent: FC<TimePickerProps> = (props) => {
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const hour = props.date?.getHours();
  const minutes = props.date?.getMinutes();
  const seconds = props.date?.getSeconds();

  const changeHours = useCallback(
    (hour: string) => {
      if (!props.date) {
        return;
      }

      const newDate = new Date(props.date);
      newDate.setHours(Number(hour) % 24);

      props.onChange(newDate);
    },
    [props]
  );

  const changeMinutes = useCallback(
    (minutes: string) => {
      if (!props.date) {
        return;
      }

      const newDate = new Date(props.date);
      newDate.setMinutes(Number(minutes) % 60);

      props.onChange(newDate);
    },
    [props]
  );

  const changeSeconds = useCallback(
    (seconds: string) => {
      if (!props.date) {
        return;
      }

      const newDate = new Date(props.date);
      newDate.setSeconds(Number(seconds) % 60);

      props.onChange(newDate);
    },
    [props]
  );

  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        setIsPickerOpen(false);
      }}
    >
      <div className="time_picker">
        {isPickerOpen && (
          <div className={classNames("time_picker_selector", props.position)}>
            <FormFieldComponent label="Hour">
              <InputComponent
                value={String(hour)}
                onChange={changeHours}
                type="number"
                placeholder="Hour"
                classNames={{ root: "time_picker__input" }}
              />
            </FormFieldComponent>
            <FormFieldComponent label="Min">
              <InputComponent
                value={String(minutes)}
                onChange={changeMinutes}
                type="number"
                placeholder="Minutes"
                classNames={{ root: "time_picker__input" }}
              />
            </FormFieldComponent>
            <FormFieldComponent label="Sec">
              <InputComponent
                value={String(seconds)}
                onChange={changeSeconds}
                type="number"
                placeholder="Seconds"
                classNames={{ root: "time_picker__input" }}
              />
            </FormFieldComponent>
          </div>
        )}
        <InputComponent
          onFocus={() => setIsPickerOpen(true)}
          value={props.date ? `${props.date.toLocaleTimeString()}` : ``}
          placeholder="Select time"
          isReadOnly={true}
          iconLeft={<FormIcon icon={faClock} />}
          iconRight={
            props.date && (
              <FormIcon
                icon={faTimes}
                title={"Clear time"}
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

export default TimePickerComponent;
