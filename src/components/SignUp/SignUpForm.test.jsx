import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import SignUpForm from "./SignUpForm";
import { authErrMsg } from "../../models/AuthModel";

const renderComponent = () => {
  const onSubmit = jest.fn();
  return render(<SignUpForm onSubmit={onSubmit} />);
};

describe("Sign Up Form Component", () => {
  it("should render properly with all the fields", () => {
    renderComponent();

    const nodes = [
      screen.getByTestId("first_name"),
      screen.getByTestId("last_name"),
      screen.getByTestId("username"),
      screen.getByTestId("password"),
      screen.getByTestId("confirmPassword"),
    ];

    for (let node of nodes) {
      expect(node).toBeInTheDocument();
      expect(node.getAttribute("value")).toBe("");
    }
  });

  it("should toggle the passwords field to display as plain text or as password", () => {
    renderComponent();

    const inputNodes = [
      screen.getByTestId("password"),
      screen.getByTestId("confirmPassword"),
    ];

    const showButtonNode = screen.getByTestId("show-btn");

    fireEvent.click(showButtonNode);

    for (let inputNode of inputNodes) {
      expect(inputNode.getAttribute("type")).toBe("text");
    }
  });

  it("should render error message when fields are empty", async () => {
    renderComponent();

    const nodes = [
      screen.getByTestId("first_name"),
      screen.getByTestId("last_name"),
      screen.getByTestId("username"),
      screen.getByTestId("password"),
      screen.getByTestId("confirmPassword"),
    ];

    const errNodes = [
      {
        node: screen.getByTestId(`error-first_name`),
        message: authErrMsg.first_name.required,
      },
      {
        node: screen.getByTestId(`error-last_name`),
        message: authErrMsg.last_name.required,
      },
      {
        node: screen.getByTestId(`error-username`),
        message: authErrMsg.username.required,
      },
      {
        node: screen.getByTestId(`error-password`),
        message: authErrMsg.password.required,
      },
    ];

    const formNode = screen.getByTestId("form-id");
    fireEvent.submit(formNode);

    for (let node of nodes) {
      expect(node).toBeInTheDocument();
    }

    await waitFor(() => {
      for (let { node, message } of errNodes) {
        expect(node.textContent).toBe(message);
      }
    });
  });

  it("should render error message for validating password and confirm password", async () => {
    renderComponent();

    const nodes = [
      { node: screen.getByTestId("password"), value: "hello1" },
      { node: screen.getByTestId("confirmPassword"), value: "hello" },
    ];

    const errNodes = [
      {
        node: screen.getByTestId(`error-password`),
        message: authErrMsg.password.validation,
      },
      {
        node: screen.getByTestId(`error-confirmPassword`),
        message: authErrMsg.confirmPassword.shouldMatch,
      },
    ];

    for (let { node, value } of nodes) {
      fireEvent.change(node, { target: { value } });
    }
    const formNode = screen.getByTestId("form-id");
    fireEvent.submit(formNode);

    for (let { node, message } of errNodes)
      await waitFor(() => {
        expect(node.textContent).toBe(message);
      });
  });

  it("should remove all the input field values after successful submission", async () => {
    renderComponent();

    const nodes = [
      { node: screen.getByTestId("first_name"), value: "Edward Vincent" },
      { node: screen.getByTestId("last_name"), value: "Cuevas" },
      { node: screen.getByTestId("username"), value: "dwrdvncntcvs" },
      { node: screen.getByTestId("password"), value: "HelloWorld18" },
      { node: screen.getByTestId("confirmPassword"), value: "HelloWorld18" },
    ];

    const formNode = screen.getByTestId("form-id");

    for (let { node, value } of nodes)
      fireEvent.change(node, { target: { value } });
    fireEvent.submit(formNode);

    await waitFor(() => {
      for (let { node } of nodes) {
        expect(node.value).toBe("");
      }
    });
  });
});
