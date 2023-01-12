import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../features/store";
import SignIn from "./SignIn";

const renderComponent = (Component) => {
  return render(
    <Provider store={store}>
      <BrowserRouter>
        <Component />
      </BrowserRouter>
    </Provider>
  );
};

describe("Sign In Page", () => {
  it("should render the page properly", () => {
    renderComponent(SignIn);

    const titleEl = screen.getAllByText("Sign In");

    expect(titleEl[0].textContent).toBe("Sign In");
    expect(titleEl[0].tagName).toBe("H1");
    expect(titleEl).toBeDefined();
  });
});
