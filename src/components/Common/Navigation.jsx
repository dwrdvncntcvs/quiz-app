import React, { useState } from "react";
import scss from "../../styles/navigation.module.scss";
import SignUpSelector from "../SignUp/SignUpSelector";

const Navigation = () => {
  const [toggle, setToggle] = useState(false);

  const signUpToggle = () => {
    setToggle(!toggle);
  };

  const options = [
    {
      label: "Quizee",
    },
    {
      label: "Quizzer",
    },
  ];

  return (
    <nav>
      <p className={scss.title}>{"Quizzy".toUpperCase()}</p>
      <div className={scss["btn-group"]}>
        <button>Sign In</button>
        <SignUpSelector toggle={toggle} options={options}>
          <button onClick={signUpToggle}>Sign Up</button>
        </SignUpSelector>
      </div>
    </nav>
  );
};

export default Navigation;
