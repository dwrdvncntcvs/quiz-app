import React from "react";
import scss from "../../styles/profileData.module.scss";
import ProfileLogo from "./ProfileLogo";
import ProfileContent from "./ProfileContent";

const ProfileData = ({ user, onSignOut, onDeleteUser }) => {
  return (
    <div className={scss["profile-data"]}>
      <div className={scss["group-content"]}>
        <ProfileLogo firstName={user?.first_name} lastName={user?.last_name} />
        <ProfileContent user={user} />
      </div>
      <div className={scss["btn-group"]}>
        <button id={scss.delete} onClick={onDeleteUser}>
          Delete User
        </button>
        <button onClick={onSignOut}>Sign Out</button>
      </div>
    </div>
  );
};

export default ProfileData;
