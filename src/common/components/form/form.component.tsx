import React, { FC, useRef } from "react";
import classNames from "classnames";
import useKeyboardPress from "../../hooks/use-keyboard-press";
import ComponentClassnames from "../../types/component-classnames";

type FormProps = {
    onSubmit: () => void;
    isLoading?: boolean;
    classNames?: ComponentClassnames;
};

const FormComponent: FC<FormProps> = (props) => {
    const formClasses = classNames(
        "form",
        props.isLoading && "is-loading",
        props.classNames?.root
    );

    const formRef = useRef<HTMLFormElement | null>(null);

    const onEnterClick = (event: KeyboardEvent) => {
        event.preventDefault();
        props.onSubmit();
    };

    useKeyboardPress({
        Enter: onEnterClick,
    });

    return (
        <form ref={formRef} onSubmit={props.onSubmit} className={formClasses}>
            {props.children}
        </form>
    );
};

export default FormComponent;
