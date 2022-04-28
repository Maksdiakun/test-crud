import React, { FC, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Spin } from "antd";
import { useAppDispatch, useAppSelector } from "../hooks";
import { AuthPages, Dashboard } from "../pages";
import { PrivateRoute } from "../components/private-route";
import { RouteEnum } from "../common-types";
import { checkUser } from "../store/slices";

export const App: FC = () => {
  const dispatch = useAppDispatch();
  const { user, load } = useAppSelector((state) => state.authStore);

  useEffect(() => {
    dispatch(checkUser());
  }, []);

  if (load) {
    return (
      <div className="spinner__wrap">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <Router>
      <Switch>
        <Route path={RouteEnum.auth} exact={true} component={AuthPages} />
        <Route
          path={RouteEnum.main}
          exact={true}
          component={() => (
            <PrivateRoute Page={() => <Dashboard user={user} />} />
          )}
        />
      </Switch>
    </Router>
  );
};
