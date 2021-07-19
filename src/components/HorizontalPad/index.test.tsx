import { render } from "tests/test-utils";
import HorizontalPad from ".";
describe("HorizontalPad", () => {
  it("should render the children", () => {
    const children = <div>Test</div>;
    const { queryByTestId, queryByText } = render(
      <HorizontalPad depth={2}>{children}</HorizontalPad>
    );
    expect(queryByTestId(/depth-2/)).toBeInTheDocument();
    expect(queryByText(/Test/i)).toBeInTheDocument();
  });
});
