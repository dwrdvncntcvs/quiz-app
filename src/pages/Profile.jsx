import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProfileData from "../components/Profile/ProfileData";
import ProfileQuizzes from "../components/Profile/ProfileQuizzes";
import { destroyAuth, useAuth } from "../features/slice/authSlice";
import PageContainer from "../layouts/PageContainer";
import { useGetAllTakenQuizzesQuery } from "../services/quizResult";
import { useLogOutMutation } from "../services/user";
import scss from "../styles/profile.module.scss";

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const isQuizzer = user?.role === "quizzer";
  const isQuizee = user?.role === "quizee";
  const {
    data: quizzesData,
    isLoading: isQuizDataLoading,
    refetch,
  } = useGetAllTakenQuizzesQuery({ userId: user?._id }, { skip: isQuizzer });

  useEffect(() => {
    refetch();
  }, [refetch]);

  const [signOut] = useLogOutMutation();
  const navigate = useNavigate();

  const signOutAction = async () => {
    console.log("Sign out...");
    await signOut();
    dispatch(destroyAuth());
    navigate("/", { replace: true });
  };

  const deleteUserAction = async () => {
    console.log("Deleting user profile...");
  };

  return (
    <PageContainer className={scss.profile}>
      <ProfileData
        user={user}
        onDeleteUser={deleteUserAction}
        onSignOut={signOutAction}
      />
      {isQuizee && (
        <ProfileQuizzes data={quizzesData} isLoading={isQuizDataLoading} />
      )}
    </PageContainer>
  );
};

export default Profile;
