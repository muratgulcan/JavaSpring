import React from "react";
import { Alert } from "../../src/shared/components/Alert";
import { Spinner } from "../../src/shared/components/Spinner";
import { getUser } from "./api";
import { useRouteParamApiRequest } from "../../src/shared/hooks/useRouteParamApiRequest";

export function UserPage() {
  const {
    apiProgress,
    data: user,
    error,
  } = useRouteParamApiRequest("id", getUser);
  return (
    <>
      {apiProgress && (
        <Alert styleType="secondary" center>
          <Spinner />
        </Alert>
      )}
      {user && <h1>{user.username}</h1>}

      {error && <Alert styleType="danger">{error}</Alert>}
    </>
  );
}
