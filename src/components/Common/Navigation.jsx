import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setModal } from "../../features/slice/modalSlice";
import scss from "../../styles/navigation.module.scss";
import SignUpSelector from "../SignUp/SignUpSelector";

const Navigation = () => {
  const [toggle, setToggle] = useState(false);
  const dispatch = useDispatch();

  const signUpToggle = () => {
    setToggle(!toggle);
  };

  const signInModal = () => {
    dispatch(setModal({ id: "signInModal" }));
  };

  const options = [
    {
      label: "Quizee",
      onClick: () => {
        dispatch(setModal({ id: "signUpModal", props: { role: "quizee" } }));
      },
    },
    {
      label: "Quizzer",
      onClick: () => {
        dispatch(setModal({ id: "signUpModal", props: { role: "quizzer" } }));
      },
    },
  ];

  return (
    <nav>
      <p className={scss.title}>{"Quizzy".toUpperCase()}</p>
      <div className={scss["btn-group"]}>
        <button onClick={signInModal}>Sign In</button>
        <SignUpSelector toggle={toggle} options={options}>
          <button onClick={signUpToggle}>Sign Up</button>
        </SignUpSelector>
      </div>
    </nav>
  );
};

export default Navigation;
