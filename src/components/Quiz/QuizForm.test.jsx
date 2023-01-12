import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import QuizForm from "./QuizForm";

describe("Quiz Form Component", () => {
  it("should render empty form when creating new quiz", () => {
    render(
      <QuizForm
        forUpdating={false}
        initialData={{ title: "", description: "", tag: "" }}
        isLoading={false}
        onSubmit={jest.fn}
      />
    );

    const labelNodes = screen.getAllByLabelText(/add/gi, { exact: false });

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
    render(
      <QuizForm
        forUpdating={true}
        initialData={{
          title: "Javascript Basic",
          description:
            "This will test your total understanding on Javascript basics. This will help you on testing your fundamental knowledge with regards to the said language. Are you ready? Just click the button and take the quiz!",
          tag: "Programming",
        }}
        isLoading={false}
        onSubmit={jest.fn}
      />
    );

    const labelNodes = screen.getAllByLabelText(/modify/gi, { exact: false });

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
});
