import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { store } from "../features/store";
import SignUp from "./SignUp";

const renderComponent = (role) => {
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[{ pathname: `/sign-up/${role}` }]}>
        <Routes>
          <Route path="/sign-up/:role" element={<SignUp />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );
};

describe("Sign In Component", () => {
  it("should render the component with the proper params of quizzer", () => {
    renderComponent("quizzer");

    const roleNode = screen.getByTestId("role");
    expect(roleNode.textContent).toEqual("Role: Quizzer");
  });

  it("should render the component with the proper params of quizee", () => {
    renderComponent("quizee");

    const roleNode = screen.getByTestId("role");
    expect(roleNode.textContent).toEqual("Role: Quizee");
  });

  it("should render an error component if the role is invalid", () => {
    const role = "invalid-role";
    renderComponent(role);

    const roleNode = screen.queryByTestId("role");
    const messageNode = screen.getByTestId("message");
    const quizzerLinkNode = screen.getByText("Quizzer");
    const quizeeLinkNode = screen.getByText("Quizee");

    expect(roleNode).toBeNull();
    expect(roleNode).not.toBeInTheDocument();
    expect(messageNode.textContent).toBe(
      `This "${role.toUpperCase()}" is not a role on the application.`
    );
    expect(quizeeLinkNode.tagName).toBe("A");
    expect(quizzerLinkNode.tagName).toBe("A");
  });
});
