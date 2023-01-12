import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { MemoryRouter, Outlet, Route, Routes } from "react-router-dom";
import QuizModifier from "./QuizModifier";
import { store } from "../../features/store";

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
    </Provider>
  );
};

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
});
