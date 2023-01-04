import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="sign-up" element={<SignUp />} />
    </Routes>
  );
}

export default App;
