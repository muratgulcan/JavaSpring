import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { activateUser } from "./api";
import { Alert } from "../../src/shared/components/Alert";

export function Activation() {
  const { token } = useParams();
  const [apiProgress, setApiProgress] = useState();
  const [successMessage, setSuccessMesage] = useState();
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    async function activate() {
      setApiProgress(true);
      try {
        const response = await activateUser(token);
        setSuccessMesage(response.data.message);
      } catch (error) {
        setErrorMessage(error.response.data.message);
        console.log(error);
      } finally {
        setApiProgress(false);
      }
    }

    activate();
  }, []);
  return (
    <>
      {apiProgress && (
        <Alert styleType="secondary" center>
          <span className="spinner-border" aria-hidden="true"></span>
        </Alert>
      )}
      {successMessage && <Alert>{successMessage}</Alert>}

      {errorMessage && <Alert styleType="danger">{errorMessage}</Alert>}
    </>
  );
}
