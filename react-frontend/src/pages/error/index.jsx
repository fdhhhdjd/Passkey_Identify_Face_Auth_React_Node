import React from "react";
import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  let error = useRouteError();
  console.error(error);
  return <h2>ErrorPage</h2>;
};

export default ErrorPage;
