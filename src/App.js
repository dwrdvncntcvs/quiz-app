import { Route, Routes } from "react-router-dom";
import ModalOverlay from "./components/Common/ModalOverlay";
import Navigation from "./components/Common/Navigation";
import Home from "./components/Home/Home";
import SignInForm from "./components/SignIn/SignInForm";
import SignUpForm from "./components/SignUp/SignUpForm";
import { useModal } from "./features/slice/modalSlice";
import MainContainer from "./layouts/MainContainer";

function App() {
  const modal = useModal();

  return (
    <MainContainer>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      {modal.id === "signInModal" && (
        <ModalOverlay>
          <SignInForm />
        </ModalOverlay>
      )}
      {modal.id === "signUpModal" && (
        <ModalOverlay>
          <SignUpForm />
        </ModalOverlay>
      )}
    </MainContainer>
  );
}

export default App;
