import React from "react";
import scss from "../../styles/optionsList.module.scss";

const OptionsList = ({
  options,
  onSelectOption,
  selectedOption,
  questionId,
}) => {
  return (
    <ul className={scss.choices}>
      {options.map(({ _id: optionId, option: optionLabel }) => {
        return (
          <li key={optionId} className={scss.option}>
            <button
              className={
                selectedOption.optionId === optionId ? scss.selected : ""
              }
              onClick={() => onSelectOption(optionId, questionId)}
            >
              {optionLabel}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default OptionsList;
