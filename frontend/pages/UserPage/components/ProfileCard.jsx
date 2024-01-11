import defaultProfileImage from "../../../src/assets/profile.png";
import React from "react";

const ProfileCard = ({ user }) => {
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
      </div>
    </div>
  );
};

export default ProfileCard;
