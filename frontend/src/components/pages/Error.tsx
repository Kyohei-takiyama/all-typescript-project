import React from "react";
import { useRouteError } from "react-router-dom";

export const Error = (): JSX.Element => {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
    </div>
  );
};
