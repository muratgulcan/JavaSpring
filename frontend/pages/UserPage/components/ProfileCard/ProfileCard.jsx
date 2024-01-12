import defaultProfileImage from "../../../../src/assets/profile.png";
import React, { useContext, useState } from "react";
import { useAuthState } from "../../../../src/shared/state/context";
import { Button } from "../../../../src/shared/components/Button";
import { Input } from "../../../../src/shared/components/Input";
import { useTranslation } from "react-i18next";
import { updateUser } from "./api";

const ProfileCard = ({ user }) => {
  const authState = useAuthState();
  const [editMode, setEditMode] = useState(false);
  const { t } = useTranslation();
  const [newUsername, setUsername] = useState();
  const [apiProgress, setApiProgress] = useState(false);

  const onChangeUsername = (event) => {
    setUsername(event.target.value);
  };

  const onClickSave = async () => {
    setApiProgress(true);
    try {
      await updateUser(user.id, { username: newUsername });
    } catch (error) {
    } finally {
      setApiProgress(false);
    }
  };

  const isEditButtonVisible = !editMode && authState.id === user.id;

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
        {!editMode && <span className="fs-3 d-block">{user.username}</span>}
        {isEditButtonVisible && (
          <Button onClick={() => setEditMode(true)}>Edit</Button>
        )}
        {editMode && (
          <>
            <Input
              label={t("username")}
              defaultValue={user.username}
              onChange={onChangeUsername}
            />
            <Button apiProgress={apiProgress} onClick={onClickSave}>
              Save
            </Button>
            <div className="d-inline m-1"></div>
            <Button
              styleType="outline-secondary"
              onClick={() => setEditMode(false)}
            >
              Cancel
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
