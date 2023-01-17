import React from "react";
import { extractInitials, mergeName } from "../../utils/helpers";
import scss from "../../styles/profileData.module.scss";

const ProfileData = ({ user }) => {
  return (
    <div className={scss["profile-data"]}>
      <div className={scss["user-logo"]}>
        {extractInitials(user?.first_name, user?.last_name)}
      </div>
      <div className={scss.content}>
        <p>{mergeName(user?.first_name, user?.last_name)}</p>
        <p>@{user?.username}</p>
        <p>{user?.role.toLocaleUpperCase()}</p>
      </div>
      <div className={scss["btn-group"]}>
        <button id={scss.delete}>Delete User</button>
        <button>Sign Out</button>
      </div>
    </div>
  );
};

export default ProfileData;
