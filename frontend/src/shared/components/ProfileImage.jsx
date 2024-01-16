import React from "react";
import defaultProfileImage from "../../../src/assets/profile.png";

export const ProfileImage = ({ width, tempImage, image }) => {
  return (
    <img
      src={tempImage || image || defaultProfileImage}
      width={width}
      height={width}
      className=" rounded-circle shadow-sm"
    />
  );
};
