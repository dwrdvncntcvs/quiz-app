import { Route, Routes } from "react-router-dom";
import Navigation from "./components/Common/Navigation";
import Home from "./components/Home/Home";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import MainContainer from "./layouts/MainContainer";

function App() {
  return (
    <MainContainer>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
      </Routes>
    </MainContainer>
  );
}

export default App;
