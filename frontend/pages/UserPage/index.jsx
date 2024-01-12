import React from "react";
import { Alert } from "../../src/shared/components/Alert";
import { Spinner } from "../../src/shared/components/Spinner";
import { getUser } from "./api";
import { useRouteParamApiRequest } from "../../src/shared/hooks/useRouteParamApiRequest";
import ProfileCard from "./components/ProfileCard/ProfileCard";

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
      {user && <ProfileCard user={user} />}

      {error && <Alert styleType="danger">{error}</Alert>}
    </>
  );
}
