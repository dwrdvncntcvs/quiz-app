import { Route, Routes } from "react-router-dom";
import Navigation from "./components/Common/Navigation";
import Home from "./components/Home/Home";
import QuizzerHome from "./components/Quiz/QuizzerHome";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import { useAuth } from "./features/slice/authSlice";
import useInitializeUser from "./hooks/useInitializeUser";
import ContentContainer from "./layouts/ContentContainer";
import MainContainer from "./layouts/MainContainer";

function App() {
  useInitializeUser();

  const { user, isAuth } = useAuth();

  return (
    <MainContainer>
      <Navigation />
      <ContentContainer>
        <Routes>
          {!isAuth && (
            <>
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/sign-up/:role" element={<SignUp />} />
            </>
          )}
          {user && user?.role !== "quizzer" ? (
            <>
              <Route path="/" element={<Home />} />
            </>
          ) : (
            <>
              <Route path="/" element={<QuizzerHome />}>
                <Route path="/create-quiz" element={<div>Hello</div>} />
              </Route>
            </>
          )}
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </ContentContainer>
    </MainContainer>
  );
}

export default App;
