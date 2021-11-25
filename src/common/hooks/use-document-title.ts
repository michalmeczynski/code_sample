import { useEffect } from "react";
import appConfig from "../../app.config";

const useDocumentTitle = (title?: string) => {
  useEffect(() => {
    document.title = title
      ? `${title} | ${appConfig.appName}`
      : appConfig.appName;
  }, [title]);
};

export default useDocumentTitle;
