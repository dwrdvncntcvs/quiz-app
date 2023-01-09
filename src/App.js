import { Route, Routes } from "react-router-dom";
import ModalOverlay from "./components/Common/ModalOverlay";
import Navigation from "./components/Common/Navigation";
import Home from "./components/Home/Home";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import { useModal } from "./features/slice/modalSlice";
import useInitializeUser from "./hooks/useInitializeUser";
import ContentContainer from "./layouts/ContentContainer";
import MainContainer from "./layouts/MainContainer";

function App() {
  const modal = useModal();
  useInitializeUser();

  return (
    <MainContainer>
      <Navigation />
      <ContentContainer>
        <Routes>
          <Route path="/" element={<Home />} />
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
