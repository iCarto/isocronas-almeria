import {render, screen} from "@testing-library/react";
import {test, expect} from "vitest";
import App from "./App";

test("renders App component", () => {
    render(<App />);

    const routesElement = screen.getByRole("application");
    expect(routesElement).toBeInTheDocument();
});
