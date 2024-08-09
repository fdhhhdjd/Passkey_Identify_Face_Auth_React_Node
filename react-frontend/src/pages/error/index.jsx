import React from "react";
import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  let error = useRouteError();
  console.error(error);
  return <div>ErrorPage</div>;
};

export default ErrorPage;
