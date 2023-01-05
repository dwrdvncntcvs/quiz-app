import React from "react";
import scss from "../../styles/SignUp/signUpSelector.module.scss";

const SignUpSelector = ({ children, toggle, options }) => {
  return (
    <div className={scss.selector}>
      {children}
      {toggle ? (
        <div className={scss.dropdown}>
          {options.map(({ label, onClick }) => (
            <button key={label} onClick={onClick}>
              {label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
};
export default SignUpSelector;
