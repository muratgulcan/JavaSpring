import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { activateUser } from "./api";

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
        <span className="spinner-border" aria-hidden="true"></span>
      )}
      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}
    </>
  );
}
