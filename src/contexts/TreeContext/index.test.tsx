import { TreeItemData } from "components/TreeItem";
import { render } from "tests/test-utils";
import { renderHook, act } from "@testing-library/react-hooks";
import { TreeContextProvider, useTree } from ".";
import { toggleOpen } from "./actions";

const mockTree: Record<string, TreeItemData> = {
  "2469bdab-23b5-4cb8-90c9-c609a49410b0": {
    id: "2469bdab-23b5-4cb8-90c9-c609a49410b0",
    name: "Richard Paul M.",
    isSelected: false,
    isOpen: false,
    parentPath: [],
    childItems: {
      "97cd3a19-0f1c-4248-a84c-a1f5a0093a89": {
        id: "97cd3a19-0f1c-4248-a84c-a1f5a0093a89",
        name: "Luis F. Doris",
        isSelected: false,
        isOpen: false,
        parentPath: ["2469bdab-23b5-4cb8-90c9-c609a49410b0"],
        childItems: {},
      },
    },
  },
};

describe("TreeContextProvider", () => {
  it("should set the initial state in localStorage", () => {
    const children = <div>test</div>;

    jest.spyOn(global.localStorage, "getItem").mockReturnValue(null);
    const setItemSpy = jest
      .spyOn(global.localStorage, "setItem")
      .mockImplementation(() => jest.fn());

    render(
      <TreeContextProvider id="test-1" initialTree={mockTree}>
        {children}
      </TreeContextProvider>
    );

    expect(setItemSpy).toBeCalledWith(
      "tree-view-test-1",
      JSON.stringify(mockTree)
    );
  });
});

describe("useTree", () => {
  it("should return the tree state", () => {
    jest.spyOn(global.localStorage, "getItem").mockReturnValue(null);

    const wrapper = ({ children }: any) => (
      <TreeContextProvider id="test-1" initialTree={mockTree}>
        {children}
      </TreeContextProvider>
    );

    const { result } = renderHook(() => useTree(), { wrapper });

    expect(result.current.state.id).toEqual("test-1");
    expect(result.current.state.tree).toEqual(mockTree);
  });

  it("should recover state from localStorage", () => {
    jest
      .spyOn(global.localStorage, "getItem")
      .mockReturnValue(JSON.stringify(mockTree));

    const wrapper = ({ children }: any) => (
      <TreeContextProvider id="test-1" initialTree={null}>
        {children}
      </TreeContextProvider>
    );

    const { result } = renderHook(() => useTree(), { wrapper });

    expect(result.current.state.id).toEqual("test-1");
    expect(result.current.state.tree).toEqual(mockTree);
  });

  it("should throw error if called outside a TreeContextProvider", () => {
    const { result } = renderHook(() => useTree());
    expect(result.error).toEqual(
      new Error("useTree must be used within a TreeContextProvider")
    );
  });

  it("should update the persisted state after an update in the tree and a debounce timeout", () => {
    jest.useFakeTimers();

    jest.spyOn(global.localStorage, "getItem").mockReturnValue(null);

    const setItemSpy = jest
      .spyOn(global.localStorage, "setItem")
      .mockImplementation(() => jest.fn());

    const wrapper = ({ children }: any) => (
      <TreeContextProvider id="test-1" initialTree={mockTree}>
        {children}
      </TreeContextProvider>
    );

    const { result } = renderHook(() => useTree(), { wrapper });

    setItemSpy.mockClear();
    const treeItem = Object.values(mockTree)[0];
    act(() => {
      result.current.dispatch(
        toggleOpen({
          id: treeItem.id,
          parentPath: [],
        })
      );
    });
    expect(setItemSpy).not.toBeCalled();

    jest.advanceTimersByTime(501);

    expect(setItemSpy).toBeCalled();

    jest.useRealTimers();
  });
});
