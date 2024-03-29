import React, { useState } from "react";
import { useAuthState } from "../../../../src/shared/state/context";
import { Button } from "../../../../src/shared/components/Button";
import { ProfileImage } from "../../../../src/shared/components/ProfileImage";
import { UserEditForm } from "./UserEditForm";

const ProfileCard = ({ user }) => {
  const authState = useAuthState();
  const [editMode, setEditMode] = useState(false);
  const [tempImage, setTempImage] = useState();

  const isEditButtonVisible = !editMode && authState.id === user.id;

  const visibleUsername =
    authState.id === user.id ? authState.username : user.username;

  return (
    <div className="card">
      <div className="card-header text-center">
        <ProfileImage width={200} tempImage={tempImage} image={user.image} />
      </div>
      <div className="card-body text-center">
        {!editMode && <span className="fs-3 d-block">{visibleUsername}</span>}
        {isEditButtonVisible && (
          <Button onClick={() => setEditMode(true)}>Edit</Button>
        )}
        {editMode && (
          <UserEditForm setEditMode={setEditMode} setTempImage={setTempImage} />
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
