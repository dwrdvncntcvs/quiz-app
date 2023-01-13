import { Field, Form, Formik, FieldArray, ErrorMessage } from "formik";
import React from "react";
import scss from "../../styles/questionForm.module.scss";
import { HiOutlineTrash, HiPlus } from "react-icons/hi";
import { questionSchema } from "../../models/QuestionModel";

const QuestionForm = ({ initialData, onSubmit, isUpdating }) => {
  return (
    <Formik
      initialValues={initialData}
      validationSchema={questionSchema}
      onSubmit={onSubmit}
    >
      {({ values }) => {
        return (
          <Form className={scss.form} data-testid="form-id">
            <Field
              as="textarea"
              name="question"
              type="text"
              placeholder="Enter your question here..."
              data-testid="question"
            />
            <p className={scss.error} data-testid="error-question">
              <ErrorMessage name="question" />
            </p>
            <FieldArray
              name="options"
              render={(arrayHelpers) => (
                <div className={scss.options}>
                  <div className={scss["options-header"]}>
                    <h2>{isUpdating ? "Modify" : "Add"} Options</h2>
                    <button
                      type="button"
                      disabled={values.options.length === 4}
                      onClick={() => {
                        const optionObj = { isCorrect: false, option: "" };
                        arrayHelpers.push(optionObj);
                      }}
                      data-testid="add-opt-btn"
                    >
                      <HiPlus />
                    </button>
                  </div>
                  {values.options.map((_option, i) => (
                    <div className={scss.option} key={i}>
                      <div className={scss["option-control"]}>
                        <div className={scss["option-select"]}>
                          <Field
                            name={`options[${i}].isCorrect`}
                            type="checkbox"
                            className={scss.checkbox}
                            data-testid="isCorrect"
                          />
                          <Field
                            name={`options[${i}].option`}
                            className={scss.option}
                            placeholder="Enter your question option here..."
                            data-testid="option"
                          />
                        </div>
                        <p className={scss.error} data-testid="error-option">
                          <ErrorMessage name={`options[${i}].option`} />
                        </p>
                      </div>

                      {i + 1 > 2 && (
                        <button
                          id={scss.delete}
                          type="button"
                          onClick={() => arrayHelpers.remove(i)}
                          data-testid="delete-opt-btn"
                        >
                          <HiOutlineTrash />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            />

            <button type="submit" data-testid="submit-btn">
              {isUpdating ? "Update" : "Add"} Question
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default QuestionForm;
