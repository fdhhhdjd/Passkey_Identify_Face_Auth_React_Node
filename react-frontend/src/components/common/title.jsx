import React from "react";
import { useMatches } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Title = () => {
  const matches = useMatches();

  const crumb = matches[matches.length - 1]?.handle?.crumb || "Auth Passkey";

  return (
    <Helmet>
      <title>{crumb}</title>
    </Helmet>
  );
};

export default Title;
