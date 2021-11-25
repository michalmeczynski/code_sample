import { FC } from "react";
import LoaderComponent from "../../loader/loader.component";

type PageLoaderProps = {};

const PageLoaderComponent: FC<PageLoaderProps> = (props) => {
  return (
    <div className="page_loader">
      <LoaderComponent
        classNames={{ root: "page_loader__loader" }}
        type="primary"
      />
    </div>
  );
};

export default PageLoaderComponent;
