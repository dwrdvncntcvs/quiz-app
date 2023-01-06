import React, { useRef } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";
import scss from "../../styles/selectOptions.module.scss";

const SelectOptions = ({ children, toggle, options, onClose }) => {
  const selectorRef = useRef(null);

  useOutsideClick(selectorRef, onClose);

  return (
    <div className={scss.selector} ref={selectorRef}>
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
export default SelectOptions;
