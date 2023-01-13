import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { MemoryRouter, Outlet, Route, Routes } from "react-router-dom";
import QuizModifier from "./QuizModifier";
import { store } from "../../features/store";
import { toast, ToastContainer } from "react-toastify";

const renderComponent = ({ title, forUpdating }) => {
  return render(
    <Provider store={store}>
      <MemoryRouter
        initialEntries={[{ pathname: "/create-quiz", state: { forUpdating } }]}
      >
        <Routes>
          <Route
            path="/"
            element={<Outlet context={{ getUserQuizzes: jest.fn() }} />}
          >
            <Route
              path="/create-quiz"
              element={<QuizModifier title={title} />}
            />
          </Route>
        </Routes>
      </MemoryRouter>
      <ToastContainer />
    </Provider>
  );
};

jest.mock("react-toastify", () => ({
  ...jest.requireActual("react-toastify"),
  toast: {
    success: jest.fn(),
  },
}));

describe("Quiz Modifier Component", () => {
  it("should render the modifier for creating new quiz", () => {
    renderComponent({ title: "Create Quiz", forUpdating: false });

    const nodes = screen.getAllByText("Create Quiz");
    const nodesTagName = ["H1", "BUTTON"];

    expect(nodes).toHaveLength(2);
    nodes.forEach(({ tagName }, i) => {
      expect(tagName).toEqual(nodesTagName[i]);
    });
  });

  it("should render the modifier for updating quiz", () => {
    renderComponent({ title: "Update Quiz", forUpdating: true });

    const nodes = screen.getAllByText("Update Quiz");
    const nodesTagName = ["H1", "BUTTON"];

    expect(nodes).toHaveLength(2);
    nodes.forEach(({ tagName }, i) => {
      expect(tagName).toEqual(nodesTagName[i]);
    });
  });

  it("should render a toast message after creating the quiz successfully", async () => {
    renderComponent({ title: "Create Quiz", forUpdating: false });

    const labelNodes = screen.getAllByLabelText(/add/i, { exact: false });

    const formNode = screen.getByTestId("form-id");

    const inputNodes = [
      {
        node: screen.getByTestId("title"),
        value: "Javascript Basic",
      },
      {
        node: screen.getByTestId("description"),
        value:
          "This will test your total understanding on Javascript basics. This will help you on testing your fundamental knowledge with regards to the said language. Are you ready? Just click the button and take the quiz!",
      },
      {
        node: screen.getByTestId("tag"),
        value: "Programming",
      },
    ];

    for (let { node, value } of inputNodes) {
      fireEvent.change(node, { target: { value } });
    }

    fireEvent.submit(formNode);

    for (let labelNode of labelNodes) {
      expect(labelNode).toBeInTheDocument();
    }

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalled();
    });
  });
});
