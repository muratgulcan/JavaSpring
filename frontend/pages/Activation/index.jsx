import React from "react";
import { activateUser } from "./api";
import { Alert } from "../../src/shared/components/Alert";
import { Spinner } from "../../src/shared/components/Spinner";
import { useRouteParamApiRequest } from "../../src/shared/hooks/useRouteParamApiRequest";

export function Activation() {
  const { apiProgress, data, error } = useRouteParamApiRequest(
    "token",
    activateUser
  );
  return (
    <>
      {apiProgress && (
        <Alert styleType="secondary" center>
          <Spinner />
        </Alert>
      )}
      {data?.message && <Alert>{data.message}</Alert>}

      {error && <Alert styleType="danger">{error}</Alert>}
    </>
  );
}
