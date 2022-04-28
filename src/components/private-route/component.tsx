import React, { FC } from "react";
import { Redirect } from "react-router-dom";
import { RouteEnum } from "../../common-types";
import { useAppSelector } from "../../hooks";

interface IProps {
  Page: FC;
}

export const PrivateRoute: FC<IProps> = ({ Page }) => {
  const { user } = useAppSelector((state) => state.authStore);
  return user ? <Page /> : <Redirect to={RouteEnum.auth} />;
};
