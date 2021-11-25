import { FC } from "react";

type FormErrorProps = {
    message?: string;
};

const FormErrorComponent: FC<FormErrorProps> = (props) => {
    if (!props.message) {
        return null;
    }

    return (
        <div className="form_error">
            <small className="form_error__message">{props.message}</small>
        </div>
    );
};

export default FormErrorComponent;
