import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useAuth } from "../../features/slice/authSlice";
import { setModal } from "../../features/slice/modalSlice";
import scss from "../../styles/navigation.module.scss";
import { extractInitials } from "../../utils/helpers";
import SignUpSelector from "../SignUp/SignUpSelector";

const Navigation = () => {
  const [toggle, setToggle] = useState(false);
  const { isAuth, user } = useAuth();
  const dispatch = useDispatch();

  const { first_name, last_name, username } = user;

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
      {!isAuth ? (
        <div className={scss["btn-group"]}>
          <button onClick={signInModal}>Sign In</button>
          <SignUpSelector toggle={toggle} options={options}>
            <button onClick={signUpToggle}>Sign Up</button>
          </SignUpSelector>
        </div>
      ) : (
        <div>
          <div>{extractInitials(first_name, last_name)}</div> {username}
        </div>
      )}
    </nav>
  );
};

export default Navigation;
