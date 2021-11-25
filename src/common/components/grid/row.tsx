import { FC } from "react";

const Row: FC = (props) => {
    return <div className="row">{props.children}</div>;
};

export default Row;
