import React from "react";
import { useAuth } from "../features/slice/authSlice";
import PageContainer from "../layouts/PageContainer";
import { useGetAllTakenQuizzesQuery } from "../services/quizResult";
import { extractInitials, mergeName } from "../utils/helpers";

const Profile = () => {
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

  return (
    <PageContainer>
      <div>
        <>
          <div>{extractInitials(user?.first_name, user?.last_name)}</div>
          <div>
            <p>{mergeName(user?.first_name, user?.last_name)}</p>
            <p>{user?.username}</p>
            <p>{user?.role}</p>
          </div>
          <button>Delete User</button>
        </>
      </div>
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
