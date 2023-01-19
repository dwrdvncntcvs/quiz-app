import React from "react";
import scss from "../../styles/profileLogo.module.scss";
import { extractInitials } from "../../utils/helpers";

const ProfileLogo = ({ firstName, lastName }) => {
  return (
    <div className={scss["user-logo"]}>
      {extractInitials(firstName, lastName)}
    </div>
  );
};

export default ProfileLogo;
