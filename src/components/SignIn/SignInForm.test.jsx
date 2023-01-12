import {
  act,
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

    const button = screen.getByTitle("show-btn");
    const eyeIcon = within(button).getByTitle("eye");

    expect(eyeIcon).toBeInTheDocument();

    fireEvent.click(button);

    const eyeOffIcon = within(button).getByTitle("eye-off");
    expect(eyeOffIcon).toBeInTheDocument();
  });

  it("should display the forms with empty fields", () => {
    renderComponent();

    const usernameNode = screen.getByTestId("username");
    const passwordNode = screen.getByTestId("password");
    const buttonNode = screen.getByTitle("submit-form");

    expect(usernameNode.tagName).toBe("INPUT");
    expect(passwordNode.tagName).toBe("INPUT");
    expect(buttonNode.tagName).toBe("BUTTON");
    expect(usernameNode.getAttribute("value")).toBe("");
    expect(passwordNode.getAttribute("value")).toBe("");
  });

  it("should display error messages per fields if submitted empty", async () => {
    renderComponent();

    const usernameNode = screen.getByTestId("username");
    const passwordNode = screen.getByTestId("password");
    const formNode = screen.getByTestId("form-id");

    fireEvent.change(usernameNode, { target: { value: "" } });
    fireEvent.change(passwordNode, { target: { value: "" } });
    fireEvent.submit(formNode);

    await waitFor(() => {
      const usernameErrorNode = screen.queryByTestId("error-username");

      expect(usernameErrorNode.textContent).toBe("Username is required");
    });

    await waitFor(() => {
      const passwordErrorNode = screen.queryByTestId("error-password");
      expect(passwordErrorNode.textContent).toBe("Password is required");
    });
  });

  it("should display error message when password is invalid", async () => {
    renderComponent();

    const usernameNode = screen.getByTestId("username");
    const passwordNode = screen.getByTestId("password");
    const formNode = screen.getByTestId("form-id");

    fireEvent.change(usernameNode, { target: { value: "dwrdvncntcvs" } });
    fireEvent.change(passwordNode, { target: { value: "password" } });
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

    const usernameNode = screen.getByTestId("username");
    const passwordNode = screen.getByTestId("password");
    const formNode = screen.getByTestId("form-id");

    fireEvent.change(usernameNode, { target: { value: "dwrdvncntcvs" } });
    fireEvent.change(passwordNode, { target: { value: "HelloWorld18" } });
    fireEvent.submit(formNode);

    await waitFor(() => {
      expect(usernameNode.getAttribute("value")).toBe("");
    });

    await waitFor(() => {
      expect(passwordNode.getAttribute("value")).toBe("");
    });
  });
});
