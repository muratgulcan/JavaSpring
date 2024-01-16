import React from "react";
import defaultProfileImage from "../../../src/assets/profile.png";

export const ProfileImage = ({ width, tempImage }) => {
  return (
    <img
      src={tempImage || defaultProfileImage}
      width={width}
      height={width}
      className=" rounded-circle shadow-sm"
    />
  );
};
