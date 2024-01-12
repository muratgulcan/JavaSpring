import React, { useState } from "react";
import { Input } from "../../../../src/shared/components/Input";
import { Button } from "../../../../src/shared/components/Button";
import {
  useAuthDispatch,
  useAuthState,
} from "../../../../src/shared/state/context";
import { useTranslation } from "react-i18next";
import { updateUser } from "./api";
import { Alert } from "../../../../src/shared/components/Alert";

export const UserEditForm = ({ setEditMode }) => {
  const { t } = useTranslation();
  const authState = useAuthState();

  const [newUsername, setUsername] = useState(authState.username);
  const [apiProgress, setApiProgress] = useState(false);
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState();

  const dispatch = useAuthDispatch();

  const onChangeUsername = (event) => {
    setUsername(event.target.value);
    setErrors({});
  };

  const onClickCancel = () => {
    setEditMode(false);
    setUsername(authState.username);
  };

  const onClickSave = async () => {
    setApiProgress(true);
    setErrors({});
    setGeneralError();
    try {
      await updateUser(authState.id, { username: newUsername });
      setEditMode(false);
      dispatch({
        type: "user-update-success",
        data: { username: newUsername },
      });
    } catch (error) {
      if (error.response?.data) {
        if (error.response.data.status === 400) {
          setErrors(error.response.data.validationErrors);
        } else {
          setGeneralError(error.response.data.message);
        }
      } else {
        setGeneralError(t("genericError"));
      }
    } finally {
      setApiProgress(false);
    }
  };

  return (
    <>
      <Input
        label={t("username")}
        defaultValue={authState.username}
        onChange={onChangeUsername}
        error={errors.username}
      />
      {generalError && <Alert styleType="danger">{generalError}</Alert>}

      <Button apiProgress={apiProgress} onClick={onClickSave}>
        Save
      </Button>
      <div className="d-inline m-1"></div>
      <Button styleType="outline-secondary" onClick={onClickCancel}>
        Cancel
      </Button>
    </>
  );
};
