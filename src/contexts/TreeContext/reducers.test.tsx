import { TreeItemData } from "components/TreeItem";
import { Action, toggleSelect } from "./actions";
import { TreeContextReducer } from "./reducers";

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

describe("TreeContextReducer", () => {
  it("should return the state without changes if the action type is invalid", () => {
    expect(
      TreeContextReducer({ id: "test", tree: mockTree }, {
        type: "invalid",
      } as unknown as Action)
    ).toEqual({ id: "test", tree: mockTree });
  });

  it("should not change the state if the it cant find the currentItem", () => {
    const state = { id: "test", tree: mockTree };
    expect(
      TreeContextReducer(
        state,
        toggleSelect({
          id: "invalid_id",
          parentPath: [],
        })
      )
    ).toEqual(state)
  });
});
