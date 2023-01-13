import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import QuestionForm from "./QuestionForm";
import { questionErrMsg } from "../../models/QuestionModel";

const renderComponent = ({ initialData, onSubmit = jest.fn(), isUpdating }) => {
  return render(
    <QuestionForm
      initialData={initialData}
      onSubmit={onSubmit}
      isUpdating={isUpdating}
    />
  );
};

describe("Question Form Component", () => {
  it("should render the component correctly for creating new questions", () => {
    renderComponent({
      initialData: {
        question: "",
        options: [
          { isCorrect: false, option: "" },
          { isCorrect: false, option: "" },
        ],
      },
      isUpdating: false,
    });

    const questionNode = screen.getByTestId("question");
    const isCorrectNodes = screen.getAllByTestId("isCorrect");
    const optionNodes = screen.getAllByTestId("option");
    const addOptionNode = screen.getByTestId("add-opt-btn");
    const submitNode = screen.getByTestId("submit-btn");

    expect(questionNode.tagName).toEqual("TEXTAREA");
    expect(questionNode).toBeInTheDocument();
    expect(questionNode.value).toBe("");

    for (let isCorrectNode of isCorrectNodes) {
      expect(isCorrectNode.tagName).toEqual("INPUT");
      expect(questionNode).toBeInTheDocument();
      expect(isCorrectNode.checked).toBe(false);
    }

    for (let optionNode of optionNodes) {
      expect(optionNode.tagName).toEqual("INPUT");
      expect(questionNode).toBeInTheDocument();
      expect(optionNode.value).toEqual("");
    }

    expect(addOptionNode).toBeInTheDocument();
    expect(addOptionNode.type).toBe("button");
    expect(addOptionNode.tagName).toBe("BUTTON");

    expect(submitNode).toBeInTheDocument();
    expect(submitNode.tagName).toBe("BUTTON");
    expect(submitNode.type).toBe("submit");
  });

  it("should add new option to the array of options after clicking add button", () => {
    renderComponent({
      initialData: {
        question: "",
        options: [
          { isCorrect: false, option: "" },
          { isCorrect: false, option: "" },
        ],
      },
      isUpdating: false,
    });

    const optionNodes = screen.getAllByTestId("option");
    const addOptionNode = screen.getByTestId("add-opt-btn");

    expect(optionNodes).toHaveLength(2);

    fireEvent.click(addOptionNode);

    const newOptionNodes = screen.getAllByTestId("option");
    expect(newOptionNodes).toHaveLength(3);
  });

  it("should display delete button when there are more than 2 values in options array", () => {
    renderComponent({
      initialData: {
        question: "",
        options: [
          { isCorrect: false, option: "" },
          { isCorrect: false, option: "" },
          { isCorrect: false, option: "" },
        ],
      },
      isUpdating: false,
    });

    const deleteNode = screen.getByTestId("delete-opt-btn");

    expect(deleteNode).toBeInTheDocument();
  });

  it("should disable the add option button when the values in options array are more than 4", () => {
    renderComponent({
      initialData: {
        question: "",
        options: [
          { isCorrect: false, option: "" },
          { isCorrect: false, option: "" },
          { isCorrect: false, option: "" },
          { isCorrect: false, option: "" },
        ],
      },
      isUpdating: false,
    });

    const addOptionNode = screen.getByTestId("add-opt-btn");

    expect(addOptionNode.disabled).toBeTruthy();
  });

  it("should delete an option node when delete button is clicked", () => {
    renderComponent({
      initialData: {
        question: "",
        options: [
          { isCorrect: false, option: "" },
          { isCorrect: false, option: "" },
          { isCorrect: false, option: "" },
          { isCorrect: false, option: "" },
        ],
      },
      isUpdating: false,
    });

    const deleteNodes = screen.getAllByTestId("delete-opt-btn");

    const scenario_1 = [
      { node: screen.getAllByTestId("isCorrect"), expectedLength: 4 },
      { node: screen.getAllByTestId("option"), expectedLength: 4 },
      { node: screen.getAllByTestId("delete-opt-btn"), expectedLength: 2 },
    ];

    for (let { node, expectedLength } of scenario_1)
      expect(node).toHaveLength(expectedLength);

    fireEvent.click(deleteNodes[0]);

    const scenario_2 = [
      { node: screen.getAllByTestId("isCorrect"), expectedLength: 3 },
      { node: screen.getAllByTestId("option"), expectedLength: 3 },
      { node: screen.getAllByTestId("delete-opt-btn"), expectedLength: 1 },
    ];

    for (let { node, expectedLength } of scenario_2)
      expect(node).toHaveLength(expectedLength);

    fireEvent.click(deleteNodes[0]);

    const scenario_3 = [
      { node: screen.getAllByTestId("isCorrect"), expectedLength: 2 },
      { node: screen.getAllByTestId("option"), expectedLength: 2 },
      { node: screen.queryAllByTestId("delete-opt-btn"), expectedLength: 0 },
    ];

    for (let { node, expectedLength } of scenario_3) {
      expect(node).toHaveLength(expectedLength);
    }
  });

  it("should display error messages for the form fields if submitted empty", async () => {
    renderComponent({
      initialData: {
        question: "",
        options: [
          { isCorrect: false, option: "" },
          { isCorrect: false, option: "" },
        ],
      },
      isUpdating: false,
    });

    const questionNode = screen.getByTestId("question");
    const optionsNode = [
      {
        nodes: screen.getAllByTestId("isCorrect"),
        value: false,
        type: "checkbox",
      },
      { nodes: screen.getAllByTestId("option"), value: "", type: "input" },
    ];

    const formNode = screen.getByTestId("form-id");

    fireEvent.change(questionNode, { target: { value: "" } });

    for (let { nodes, value, type } of optionsNode)
      for (let node of nodes)
        if (type === "checkbox")
          fireEvent.change(node, { target: { checked: value } });
        else if (type === "input")
          fireEvent.change(node, { target: { value } });

    fireEvent.submit(formNode);

    await waitFor(() => {
      const questionErrNode = screen.getByTestId("error-question");
      expect(questionErrNode.textContent).toBe(
        questionErrMsg.question.required
      );
    });

    await waitFor(() => {
      const optionErrNode = screen.getAllByTestId("error-option");
      for (let node of optionErrNode)
        expect(node.textContent).toBe(
          questionErrMsg.options.array.option.required
        );
    });
  });

  it("should display proper error messages on fields once validated", async () => {
    renderComponent({
      initialData: {
        question: "Hello",
        options: [
          { isCorrect: false, option: "Opt 1" },
          { isCorrect: false, option: "Opt 2" },
        ],
      },
      isUpdating: false,
    });

    const formNode = screen.getByTestId("form-id");

    fireEvent.submit(formNode);

    const questionErrNode = screen.getByTestId("error-question");
    await waitFor(() => {
      expect(questionErrNode.textContent).toBe(questionErrMsg.question.length);
    });
  });
});
