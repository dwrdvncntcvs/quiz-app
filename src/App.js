import { Route, Routes } from "react-router-dom";
import ModalOverlay from "./components/Common/ModalOverlay";
import Navigation from "./components/Common/Navigation";
import Home from "./components/Home/Home";
import QuizzerHome from "./components/Quiz/QuizzerHome";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import { useAuth } from "./features/slice/authSlice";
import { useModal } from "./features/slice/modalSlice";
import useInitializeUser from "./hooks/useInitializeUser";
import ContentContainer from "./layouts/ContentContainer";
import MainContainer from "./layouts/MainContainer";

function App() {
  const modal = useModal();
  useInitializeUser();

  const { user } = useAuth();

  return (
    <MainContainer>
      <Navigation />
      <ContentContainer>
        <Routes>
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
