import { act, fireEvent, render, waitFor } from "tests/test-utils";
import Header from "./index";

describe("Header", () => {
  it("should render correctly", async () => {
    render(<Header />);
  });

  it("should expand the keyboard navigation header when clicked upon", async () => {
    const { queryByTestId, getByTestId } = render(<Header />);
    expect(queryByTestId(/keyboard-navigation-header/)).toBeTruthy();
    expect(queryByTestId(/keyboard-navigation-content/)).not.toBeVisible();
    act(() => {
      fireEvent.click(getByTestId(/keyboard-navigation-header/));
    });
    await waitFor(() => {
      expect(queryByTestId(/keyboard-navigation-content/)).toBeVisible();
    });
  });
});
