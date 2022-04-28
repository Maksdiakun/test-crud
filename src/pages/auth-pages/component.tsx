import React, { FC } from "react";
import { Button } from "antd";
import { googleAuth } from "../../store/slices";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Redirect } from "react-router-dom";
import { RouteEnum } from "../../common-types";
import "./style.scss";

export const AuthPages: FC = () => {
  const { user } = useAppSelector((state) => state.authStore);
  const dispatch = useAppDispatch();

  const getAuth = () => {
    dispatch(googleAuth());
  };

  if (user) {
    return <Redirect to={RouteEnum.main} />;
  }

  return (
    <div className="auth-wrap">
      <Button onClick={getAuth} type="primary">
        Sign In
      </Button>
    </div>
  );
};
