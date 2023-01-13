import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import QuizForm from "./QuizForm";
import { quizErrMsg } from "../../models/QuizModel";

const renderComponent = ({ forUpdating, initialData, isLoading, onSubmit }) => {
  return render(
    <QuizForm
      forUpdating={forUpdating}
      initialData={initialData}
      isLoading={isLoading}
      onSubmit={onSubmit}
    />
  );
};

describe("Quiz Form Component", () => {
  it("should render empty form when creating new quiz", () => {
    renderComponent({
      forUpdating: false,
      initialData: { title: "", description: "", tag: "" },
      isLoading: false,
      onSubmit: () => jest.fn(),
    });

    const labelNodes = screen.getAllByLabelText(/add/i, { exact: false });

    for (let labelNode of labelNodes) {
      expect(labelNode).toBeInTheDocument();
    }

    const inputNodes = [
      { node: screen.getByTestId("title"), nodeTagName: "INPUT" },
      { node: screen.getByTestId("description"), nodeTagName: "TEXTAREA" },
      { node: screen.getByTestId("tag"), nodeTagName: "INPUT" },
    ];

    for (let { node, nodeTagName } of inputNodes) {
      expect(node.value).toBe("");
      expect(node.tagName).toBe(nodeTagName);
    }
  });

  it("should render proper values for fields when updating the quiz", () => {
    renderComponent({
      forUpdating: true,
      initialData: {
        title: "Javascript Basic",
        description:
          "This will test your total understanding on Javascript basics. This will help you on testing your fundamental knowledge with regards to the said language. Are you ready? Just click the button and take the quiz!",
        tag: "Programming",
      },
      isLoading: false,
      onSubmit: () => jest.fn(),
    });

    const labelNodes = screen.getAllByLabelText(/modify/i, { exact: false });

    for (let labelNode of labelNodes) {
      expect(labelNode).toBeInTheDocument();
    }

    const inputNodes = [
      {
        node: screen.getByTestId("title"),
        nodeTagName: "INPUT",
        value: "Javascript Basic",
      },
      {
        node: screen.getByTestId("description"),
        nodeTagName: "TEXTAREA",
        value:
          "This will test your total understanding on Javascript basics. This will help you on testing your fundamental knowledge with regards to the said language. Are you ready? Just click the button and take the quiz!",
      },
      {
        node: screen.getByTestId("tag"),
        nodeTagName: "INPUT",
        value: "Programming",
      },
    ];

    for (let { node, nodeTagName, value } of inputNodes) {
      expect(node.value).toBe(value);
      expect(node.tagName).toBe(nodeTagName);
    }
  });

  it("should render error messages when form is submitted with empty fields", async () => {
    renderComponent({
      forUpdating: false,
      initialData: { title: "", description: "", tag: "" },
      isLoading: false,
      onSubmit: () => jest.fn(),
    });

    const labelNodes = screen.getAllByLabelText(/add/i, { exact: false });

    for (let labelNode of labelNodes) {
      expect(labelNode).toBeInTheDocument();
    }

    const inputNodes = [
      {
        node: screen.getByTestId("title"),
        nodeTagName: "INPUT",
        errorMessage: quizErrMsg.title.required,
      },
      {
        node: screen.getByTestId("description"),
        nodeTagName: "TEXTAREA",
        errorMessage: quizErrMsg.description.required,
      },
      {
        node: screen.getByTestId("tag"),
        nodeTagName: "INPUT",
        errorMessage: quizErrMsg.tag.required,
      },
    ];

    const formNode = screen.getByTestId("form-id");
    fireEvent.submit(formNode);

    const errNodes = [
      {
        node: screen.getByTestId("error-title"),
        errorMessage: quizErrMsg.title.required,
      },
      {
        node: screen.getByTestId("error-description"),
        errorMessage: quizErrMsg.description.required,
      },
      {
        node: screen.getByTestId("error-tag"),
        errorMessage: quizErrMsg.tag.required,
      },
    ];

    for (let { node, nodeTagName } of inputNodes) {
      expect(node.tagName).toBe(nodeTagName);
    }

    for (let { errorMessage, node } of errNodes) {
      await waitFor(() => {
        expect(node.textContent).toBe(errorMessage);
      });
    }
  });

  it("should render proper error message when description does not reach its min characters", async () => {
    renderComponent({
      forUpdating: false,
      initialData: {
        title: "Hello World",
        description: "Hello Desc",
        tag: "Sample",
      },
      isLoading: false,
      onSubmit: () => jest.fn(),
    });

    const labelNodes = screen.getAllByLabelText(/add/i, { exact: false });

    const errNodes = [
      {
        node: screen.getByTestId("error-title"),
        errorMessage: "",
      },
      {
        node: screen.getByTestId("error-description"),
        errorMessage: quizErrMsg.description.len,
      },
      {
        node: screen.getByTestId("error-tag"),
        errorMessage: "",
      },
    ];

    const formNode = screen.getByTestId("form-id");
    fireEvent.submit(formNode);

    for (let labelNode of labelNodes) {
      expect(labelNode).toBeInTheDocument();
    }

    for (let { errorMessage, node } of errNodes) {
      await waitFor(() => {
        expect(node.textContent).toBe(errorMessage);
      });
    }
  });
});
