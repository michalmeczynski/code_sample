import "./App.scss";
import { BrowserRouter, Switch } from "react-router-dom";
import AppRoutes from "./routes/app-routes";
import RouteComponent from "./routes/route.component";
import HeaderComponent from "./modules/header/header.component";
import AsidePanelComponent from "./modules/aside-panel/aside-panel.component";
import { useMemo } from "react";

const App = () => {
  const AuthorizedAppContent = useMemo(() => {
    return (
      <BrowserRouter>
        <AsidePanelComponent />
        <HeaderComponent />
        <div className="page_content">
          {
            <Switch>
              {AppRoutes.map((route) => {
                return <RouteComponent key={route.path} {...route} />;
              })}
            </Switch>
          }
        </div>
      </BrowserRouter>
    );
  }, []);

  return <div className="App">{AuthorizedAppContent}</div>;
};

export default App;
