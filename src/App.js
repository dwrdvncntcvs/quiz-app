import { Route, Routes } from "react-router-dom";
import Navigation from "./components/Common/Navigation";
import Home from "./pages/Home";
import QuizDetails from "./pages/QuizDetails";
import QuizModifier from "./components/Quiz/QuizModifier";
import QuizzerHome from "./pages/QuizzerHome";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { useAuth } from "./features/slice/authSlice";
import useInitializeUser from "./hooks/useInitializeUser";
import ContentContainer from "./layouts/ContentContainer";
import MainContainer from "./layouts/MainContainer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
                <Route
                  path="create-quiz"
                  element={<QuizModifier title={"Create Quiz"} />}
                />
                <Route
                  path="update-quiz/:quizId"
                  element={<QuizModifier title={"Update Quiz"} />}
                />
              </Route>
              <Route path="/quiz/:quizId" element={<QuizDetails />} />
            </>
          )}
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </ContentContainer>
      <ToastContainer position="bottom-right"/>
    </MainContainer>
  );
}

export default App;
