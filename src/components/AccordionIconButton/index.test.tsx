import { act } from "react-dom/test-utils";
import { fireEvent, render } from "tests/test-utils";
import AccordionIconButton from "./index";

describe("AccordionIconButton", () => {
  it("should render a closed button", () => {
    const onClick = jest.fn();
    const isOpen = false;
    const { queryByLabelText } = render(
      <AccordionIconButton isOpen={isOpen} onClick={onClick} />
    );
    expect(queryByLabelText(/accordion button closed/)).toBeTruthy();
  });
  it("should render a open button", () => {
    const onClick = jest.fn();
    const isOpen = true;
    const { queryByLabelText } = render(
      <AccordionIconButton isOpen={isOpen} onClick={onClick} />
    );
    expect(queryByLabelText(/accordion button open/)).toBeTruthy();
  });
  it("should render a closed button by default", () => {
    const onClick = jest.fn();
    const { queryByLabelText } = render(
      <AccordionIconButton onClick={onClick} />
    );
    expect(queryByLabelText(/accordion button closed/)).toBeTruthy();
  });

  it("should call onClick when clicking the button", () => {
    const onClick = jest.fn();
    const isOpen = true;
    const { getByLabelText } = render(
      <AccordionIconButton isOpen={isOpen} onClick={onClick} />
    );
    act(() => {
      fireEvent.click(getByLabelText(/accordion button open/));
    });
    expect(onClick).toBeCalled();
  });
});
