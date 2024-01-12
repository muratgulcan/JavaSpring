import defaultProfileImage from "../../../../src/assets/profile.png";
import React, { useContext, useState } from "react";
import {
  useAuthDispatch,
  useAuthState,
} from "../../../../src/shared/state/context";
import { Button } from "../../../../src/shared/components/Button";
import { Input } from "../../../../src/shared/components/Input";
import { useTranslation } from "react-i18next";
import { updateUser } from "./api";
import { Alert } from "../../../../src/shared/components/Alert";

const ProfileCard = ({ user }) => {
  const authState = useAuthState();
  const [editMode, setEditMode] = useState(false);
  const { t } = useTranslation();
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
      await updateUser(user.id, { username: newUsername });
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

  const isEditButtonVisible = !editMode && authState.id === user.id;

  const visibleUsername =
    authState.id === user.id ? authState.username : user.username;

  return (
    <div className="card">
      <div className="card-header text-center">
        <img
          src={defaultProfileImage}
          width={200}
          className="img-fluid rounded-circle shadow-sm"
        />
      </div>
      <div className="card-body text-center">
        {generalError && <Alert styleType="danger">{generalError}</Alert>}

        {!editMode && <span className="fs-3 d-block">{visibleUsername}</span>}
        {isEditButtonVisible && (
          <Button onClick={() => setEditMode(true)}>Edit</Button>
        )}
        {editMode && (
          <>
            <Input
              label={t("username")}
              defaultValue={visibleUsername}
              onChange={onChangeUsername}
              error={errors.username}
            />
            <Button apiProgress={apiProgress} onClick={onClickSave}>
              Save
            </Button>
            <div className="d-inline m-1"></div>
            <Button styleType="outline-secondary" onClick={onClickCancel}>
              Cancel
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
