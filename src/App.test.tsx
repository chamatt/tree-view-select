import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders placeholder", () => {
  render(<App />);
  const linkElement = screen.getByText(/placeholder/i);
  expect(linkElement).toBeInTheDocument();
});
