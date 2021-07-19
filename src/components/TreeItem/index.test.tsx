/* eslint-disable testing-library/no-await-sync-query */
import { TreeContextProvider, useTree } from "contexts/TreeContext";
import { act, fireEvent, getByTestId, render, waitFor } from "tests/test-utils";

import TreeItem, { TreeItemData } from ".";

const mockItem: TreeItemData = {
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
    "12cd3a19-0f1c-4248-a84c-a1f5a0093a89": {
      id: "12cd3a19-0f1c-4248-a84c-a1f5a0093a89",
      name: "Luis F. Doris",
      isSelected: false,
      isOpen: false,
      parentPath: ["2469bdab-23b5-4cb8-90c9-c609a49410b0"],
      childItems: {},
    },
  },
};

const mockTree: Record<string, TreeItemData> = {
  "2469bdab-23b5-4cb8-90c9-c609a49410b0": mockItem,
};

const openItem = (getByLabelText: any) => {
  act(() => {
    fireEvent.click(getByLabelText(/accordion button closed/i));
  });
};
const closeItem = (getByLabelText: any) => {
  act(() => {
    fireEvent.click(getByLabelText(/accordion button open/i));
  });
};

const toggleSelect = (getByTestId: any, id: string) => {
  act(() => {
    fireEvent.click(getByTestId(`tree-item-${id}`));
  });
};

const checkIsVisible = async (queryByTestId: any, id: string) => {
  await waitFor(() => {
    expect(queryByTestId(`tree-item-${id}`)).toBeVisible();
  });
};

describe("TreeItem", () => {
  it("renders correctly", async () => {
    const { queryByTestId } = render(
      <TreeContextProvider initialTree={mockTree}>
        <TreeItem {...mockItem} />
      </TreeContextProvider>
    );

    await checkIsVisible(queryByTestId, mockItem.id);
  });

  it("should expand the children after clicking the expand button", async () => {
    const LiveComponent = () => {
      const { state } = useTree();
      return (
        <TreeItem {...state.tree["2469bdab-23b5-4cb8-90c9-c609a49410b0"]} />
      );
    };

    const { queryByTestId, getByLabelText } = render(
      <TreeContextProvider initialTree={mockTree}>
        <LiveComponent />
      </TreeContextProvider>
    );

    await checkIsVisible(queryByTestId, mockItem.id);

    expect(
      queryByTestId(`tree-item-97cd3a19-0f1c-4248-a84c-a1f5a0093a89`)
    ).toBeFalsy();

    openItem(getByLabelText);

    await checkIsVisible(queryByTestId, "97cd3a19-0f1c-4248-a84c-a1f5a0093a89");
  });

  it("should select/unselect item when clicking it, along with it's children", async () => {
    const LiveComponent = () => {
      const { state } = useTree();
      return (
        <TreeItem {...state.tree["2469bdab-23b5-4cb8-90c9-c609a49410b0"]} />
      );
    };

    const { queryByTestId, getByLabelText, getByTestId } = render(
      <TreeContextProvider initialTree={mockTree}>
        <LiveComponent />
      </TreeContextProvider>
    );
    expect(queryByTestId(`tree-item-${mockItem.id}`)).toBeVisible();
    expect(
      queryByTestId(`tree-item-97cd3a19-0f1c-4248-a84c-a1f5a0093a89`)
    ).toBeFalsy();

    toggleSelect(getByTestId, mockItem.id);

    openItem(getByLabelText);

    await checkIsVisible(queryByTestId, "97cd3a19-0f1c-4248-a84c-a1f5a0093a89");

    expect(queryByTestId(`checkbox-checked-${mockItem.id}`)).toBeTruthy();

    expect(
      queryByTestId(`checkbox-checked-97cd3a19-0f1c-4248-a84c-a1f5a0093a89`)
    ).toBeTruthy();

    toggleSelect(getByTestId, mockItem.id);

    expect(queryByTestId(`checkbox-unchecked-${mockItem.id}`)).toBeTruthy();

    expect(
      queryByTestId(`checkbox-unchecked-97cd3a19-0f1c-4248-a84c-a1f5a0093a89`)
    ).toBeTruthy();
  });

  it("should make the parent indeterminate if only selects one children, and should make it selected when selecting all", async () => {
    const LiveComponent = () => {
      const { state } = useTree();
      return (
        <TreeItem {...state.tree["2469bdab-23b5-4cb8-90c9-c609a49410b0"]} />
      );
    };

    const { queryByTestId, getByLabelText, getByTestId } = render(
      <TreeContextProvider initialTree={mockTree}>
        <LiveComponent />
      </TreeContextProvider>
    );
    expect(queryByTestId(`tree-item-${mockItem.id}`)).toBeVisible();
    expect(
      queryByTestId(`tree-item-97cd3a19-0f1c-4248-a84c-a1f5a0093a89`)
    ).toBeFalsy();
    openItem(getByLabelText);

    await checkIsVisible(queryByTestId, "97cd3a19-0f1c-4248-a84c-a1f5a0093a89");

    // selecting first child
    toggleSelect(getByTestId, "97cd3a19-0f1c-4248-a84c-a1f5a0093a89");

    expect(
      queryByTestId(`checkbox-checked-97cd3a19-0f1c-4248-a84c-a1f5a0093a89`)
    ).toBeTruthy();

    expect(queryByTestId(`checkbox-indeterminate-${mockItem.id}`)).toBeTruthy();

    //selecting second child
    toggleSelect(getByTestId, "12cd3a19-0f1c-4248-a84c-a1f5a0093a89");
    expect(
      queryByTestId(`checkbox-checked-12cd3a19-0f1c-4248-a84c-a1f5a0093a89`)
    ).toBeTruthy();

    expect(queryByTestId(`checkbox-checked-${mockItem.id}`)).toBeTruthy();

  });
});
