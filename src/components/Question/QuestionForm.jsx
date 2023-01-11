import { Field, Form, Formik, FieldArray, ErrorMessage } from "formik";
import React, { Fragment } from "react";
import scss from "../../styles/questionForm.module.scss";
import { HiOutlineTrash, HiPlus } from "react-icons/hi";
import { questionSchema } from "../../models/QuestionModel";
import { useModal } from "../../features/slice/modalSlice";

const QuestionForm = ({ initialData, onSubmit }) => {
  const { props: modalProps } = useModal();

  return (
    <Formik
      initialValues={initialData}
      validationSchema={questionSchema}
      onSubmit={onSubmit}
    >
      {({ values }) => {
        return (
          <Form className={scss.form}>
            <Field
              as="textarea"
              name="question"
              type="text"
              placeholder="Enter your question here..."
            />
            <ErrorMessage name="question" />
            <FieldArray
              name="options"
              render={(arrayHelpers) => (
                <div className={scss.options}>
                  <div className={scss["options-header"]}>
                    <h1>{modalProps?.isUpdating ? "Modify" : "Add"} Option</h1>
                    <button
                      type="button"
                      disabled={values.options.length === 4}
                      onClick={() => {
                        const optionObj = { isCorrect: false, option: "" };
                        arrayHelpers.push(optionObj);
                      }}
                    >
                      <HiPlus />
                    </button>
                  </div>
                  {values.options.map((_option, i) => (
                    <Fragment key={i}>
                      <div className={scss.option}>
                        <div className={scss["option-control"]}>
                          <div className={scss["option-select"]}>
                            <Field
                              name={`options[${i}].isCorrect`}
                              type="checkbox"
                              className={scss.checkbox}
                            />
                            <Field
                              name={`options[${i}].option`}
                              placeholder="Enter your question option here..."
                            />
                          </div>
                          <ErrorMessage name={`options[${i}].option`} />
                        </div>

                        {i + 1 > 2 && (
                          <button
                            id={scss.delete}
                            type="button"
                            onClick={() => arrayHelpers.remove(i)}
                          >
                            <HiOutlineTrash />
                          </button>
                        )}
                      </div>
                    </Fragment>
                  ))}
                </div>
              )}
            />

            <button type="submit">
              {modalProps?.isUpdating ? "Update" : "Add"} Question
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default QuestionForm;
