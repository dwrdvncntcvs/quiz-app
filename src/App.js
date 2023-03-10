import { Route, Routes } from "react-router-dom";
import Navigation from "./components/Common/Navigation";
import Home from "./pages/Home";
import QuizDetails from "./pages/QuizDetails";
import QuizModifier from "./components/Quiz/QuizModifier";
import QuizzerHome from "./pages/QuizzerHome";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ContentContainer from "./layouts/ContentContainer";
import MainContainer from "./layouts/MainContainer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PublicRoutes from "./routes/PublicRoutes";
import Persistence from "./routes/Persistence";
import RequiredAuth from "./routes/RequiredAuth";
import AuthRoutes from "./routes/AuthRoutes";
import QuizAssessment from "./pages/QuizAssessment";
import QuizResult from "./pages/QuizResult";
import Profile from "./pages/Profile";
import QuizRecord from "./pages/QuizRecord";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <MainContainer>
      <Navigation />
      <ContentContainer>
        <Routes>
          <Route element={<PublicRoutes />}>
            <Route element={<AuthRoutes />}>
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/sign-up/:role" element={<SignUp />} />
            </Route>
            <Route path="/" element={<Home />} />
          </Route>

          <Route element={<Persistence />}>
            <Route element={<RequiredAuth role={"quizzer"} />}>
              <Route path="/quizzer/" element={<QuizzerHome />}>
                <Route
                  path="create-quiz"
                  element={<QuizModifier title={"Create Quiz"} />}
                />
                <Route
                  path="update-quiz/:quizId"
                  element={<QuizModifier title={"Update Quiz"} />}
                />
              </Route>
              <Route path="/quizzer/quiz/:quizId" element={<QuizDetails />} />
            </Route>
          </Route>

          <Route element={<Persistence />}>
            <Route element={<RequiredAuth role={"quizee"} />}>
              <Route
                path="/quizee/assessment/:quizId"
                element={<QuizAssessment />}
              />
              <Route
                path="/quizee/assessment/:quizId/result/:quizResultId"
                element={<QuizResult />}
              />
            </Route>
          </Route>

          <Route path="/profile" element={<Persistence />}>
            <Route element={<RequiredAuth />}>
              <Route path="" element={<Profile />}>
                <Route path="quiz-record/:quizId" element={<QuizRecord />} />
              </Route>
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </ContentContainer>
      <ToastContainer position="bottom-right" />
    </MainContainer>
  );
}

export default App;
