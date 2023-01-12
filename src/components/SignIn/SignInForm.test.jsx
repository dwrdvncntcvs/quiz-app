import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import SignInForm from "./SignInForm";

const renderComponent = () => {
  const onSubmit = jest.fn();

  return render(<SignInForm onSubmit={onSubmit.mockImplementationOnce()} />);
};

describe("Sign In Form Component", () => {
  it("should toggle to show password or plain text or hide it", () => {
    renderComponent();

    const passwordNode = screen.getByTestId("password");
    const button = screen.getByTitle("show-btn");
    const eyeIcon = within(button).getByTitle("eye");

    expect(eyeIcon).toBeInTheDocument();

    fireEvent.click(button);

    const eyeOffIcon = within(button).getByTitle("eye-off");
    expect(eyeOffIcon).toBeInTheDocument();
    expect(passwordNode.getAttribute("type")).toBe("text");
  });

  it("should display the forms with empty fields", () => {
    renderComponent();

    const nodes = [
      screen.getByTestId("username"),
      screen.getByTestId("password"),
    ];

    const buttonNode = screen.getByTitle("submit-form");

    expect(buttonNode.tagName).toBe("BUTTON");
    for (let node of nodes) {
      expect(node.tagName).toBe("INPUT");
      expect(node.getAttribute("value")).toBe("");
    }
  });

  it("should display error messages per fields if submitted empty", async () => {
    renderComponent();

    const nodes = [
      { node: screen.getByTestId("username"), message: "Username is required" },
      { node: screen.getByTestId("password"), message: "Password is required" },
    ];

    const formNode = screen.getByTestId("form-id");

    for (let { node } of nodes) {
      fireEvent.change(node, { target: { value: "" } });
    }
    fireEvent.submit(formNode);

    for (let { node, message } of nodes) {
      const nodeName = node.getAttribute("name");
      await waitFor(() => {
        const errorNode = screen.queryByTestId(`error-${nodeName}`);

        expect(errorNode.textContent).toBe(message);
      });
    }
  });

  it("should display error message when password is invalid", async () => {
    renderComponent();

    const nodes = [
      { node: screen.getByTestId("username"), value: "dwrdvncntcvs" },
      { node: screen.getByTestId("password"), value: "password" },
    ];

    const formNode = screen.getByTestId("form-id");

    for (let { node, value } of nodes)
      fireEvent.change(node, { target: { value } });
    fireEvent.submit(formNode);

    await waitFor(() => {
      const passwordErrorNode = screen.queryByTestId("error-password");
      expect(passwordErrorNode.textContent).toEqual(
        "Password Minimum eight characters, at least one letter, one number and one special character"
      );
    });
  });

  it("should clear the input fields when form is submitted successfully", async () => {
    renderComponent();

    const nodes = [
      { node: screen.getByTestId("username"), value: "dwrdvncntcvs" },
      { node: screen.getByTestId("password"), value: "HelloWorld18" },
    ];

    const formNode = screen.getByTestId("form-id");

    for (let { node, value } of nodes)
      fireEvent.change(node, { target: { value } });
    fireEvent.submit(formNode);

    for (let { node } of nodes)
      await waitFor(() => {
        expect(node.getAttribute("value")).toBe("");
      });
  });
});
