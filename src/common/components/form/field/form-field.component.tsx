import classNames from "classnames";
import React, { FC, ReactNode } from "react";
import ComponentClassnames from "../../../types/component-classnames";
import FormErrorComponent from "../error/form-error.component";

type FormFieldProps = {
  children: ReactNode;
  classNames?: ComponentClassnames & {
    content?: string;
  };
  label: string;
  isRequired?: boolean;
  errorMessage?: string;
};

const FormFieldComponent: FC<FormFieldProps> = (props) => {
  return (
    <div className={classNames("form_field", props.classNames?.root)}>
      <label className="form_field_label">
        {props.label}
        {props.isRequired && (
          <span className="form_field_required__wrapper">
            <span
              className="form_field_required__dot"
              title={`This field is required`}
            >
              *
            </span>
          </span>
        )}
      </label>
      <div
        className={classNames("form_field__content", props.classNames?.content)}
      >
        {props.children}
      </div>
      <FormErrorComponent message={props.errorMessage} />
    </div>
  );
};

export default FormFieldComponent;
