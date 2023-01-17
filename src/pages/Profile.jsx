import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProfileData from "../components/Profile/ProfileData";
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
  const { data: quizzesData, isLoading: isQuizDataLoading } =
    useGetAllTakenQuizzesQuery(
      { userId: user?._id },
      {
        skip: isQuizzer,
      }
    );
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
        <div>
          <h1>Quizzes Taken</h1>
          {isQuizDataLoading && <p>Loading ...</p>}
          {!isQuizDataLoading &&
            quizzesData?.map((quiz) => (
              <div key={quiz?._id}>
                <h2>{quiz?.title}</h2>
                <p>{quiz?.author}</p>
                <p>{quiz?.description}</p>
                <p>Attempt: {quiz?.attempts}</p>
                <p>Total: {quiz?.totalItems}</p>
                <button>View Records</button>
              </div>
            ))}
        </div>
      )}
    </PageContainer>
  );
};

export default Profile;
