import React from "react";
import { mergeName } from "../../utils/helpers";
import scss from "../../styles/profileContent.module.scss";

const ProfileContent = ({ user }) => {
  return (
    <div className={scss.content}>
      <p>{mergeName(user?.first_name, user?.last_name)}</p>
      <p>@{user?.username}</p>
      <p>{user?.role.toLocaleUpperCase()}</p>
    </div>
  );
};

export default ProfileContent;
