import React from "react";
import scss from "../../styles/SignUp/signUpSelector.module.scss";

const SignUpSelector = ({ children, toggle, options, onBlur }) => {
  return (
    <div className={scss.selector}>
      {children}
      {toggle ? (
        <div className={scss.dropdown} onBlur={onBlur}>
          {options.map(({ label }) => (
            <button key={label}>{label}</button>
          ))}
        </div>
      ) : null}
    </div>
  );
};
export default SignUpSelector;
