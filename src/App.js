import { Route, Routes } from "react-router-dom";
import ModalOverlay from "./components/Common/ModalOverlay";
import Navigation from "./components/Common/Navigation";
import Home from "./components/Home/Home";
import QuizzerHome from "./components/Quiz/QuizzerHome";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import { useModal } from "./features/slice/modalSlice";
import useInitializeUser from "./hooks/useInitializeUser";
import ContentContainer from "./layouts/ContentContainer";
import MainContainer from "./layouts/MainContainer";
import Quizee from "./routes/Quizee";
import Quizzer from "./routes/Quizzer";

function App() {
  const modal = useModal();
  useInitializeUser();

  return (
    <MainContainer>
      <Navigation />
      <ContentContainer>
        <Routes>
          <Route element={<Quizee />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route element={<Quizzer />}>
            <Route path="/quizzer" element={<QuizzerHome />} />
          </Route>
        </Routes>
      </ContentContainer>
      {modal.id === "signInModal" && (
        <ModalOverlay>
          <SignIn />
        </ModalOverlay>
      )}
      {modal.id === "signUpModal" && (
        <ModalOverlay>
          <SignUp />
        </ModalOverlay>
      )}
    </MainContainer>
  );
}

export default App;
