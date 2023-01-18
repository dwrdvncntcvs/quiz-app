import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import ProfileData from "../components/Profile/ProfileData";
import ProfileQuizzes from "../components/Profile/ProfileQuizzes";
import { destroyAuth, useAuth } from "../features/slice/authSlice";
import PageContainer from "../layouts/PageContainer";
import { useGetAllTakenQuizzesQuery } from "../services/quizResult";
import { useDeleteUserMutation, useLogOutMutation } from "../services/user";
import scss from "../styles/profile.module.scss";

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const isQuizzer = user?.role === "quizzer";
  const isQuizee = user?.role === "quizee";
  const {
    data: quizzesData,
    isLoading: isQuizDataLoading,
    refetch: refetchQuizData,
  } = useGetAllTakenQuizzesQuery({ userId: user?._id }, { skip: isQuizzer });
  const [deleteUser] = useDeleteUserMutation();

  useEffect(() => {
    if (isQuizee) refetchQuizData();
  }, [refetchQuizData, isQuizee]);

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
    await deleteUser();
    dispatch(destroyAuth());
    navigate("/", { replace: true });
  };

  return (
    <PageContainer className={scss.profile}>
      <div className={scss.content}>
        <ProfileData
          user={user}
          onDeleteUser={deleteUserAction}
          onSignOut={signOutAction}
        />
        {isQuizee && (
          <ProfileQuizzes data={quizzesData} isLoading={isQuizDataLoading} />
        )}
        {isQuizzer && <div>Content Will Be Added Soon</div>}
      </div>
      <Outlet />
    </PageContainer>
  );
};

export default Profile;
