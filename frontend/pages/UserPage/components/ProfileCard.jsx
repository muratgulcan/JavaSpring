import defaultProfileImage from "../../../src/assets/profile.png";
import React, { useContext } from "react";
import { useAuthState } from "../../../src/shared/state/context";
import { Button } from "../../../src/shared/components/Button";

const ProfileCard = ({ user }) => {
  const authState = useAuthState();
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
        <span className="fs-3">{user.username}</span>
        {authState.id === user.id && <Button>Edit</Button>}
      </div>
    </div>
  );
};

export default ProfileCard;
