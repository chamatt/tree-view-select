import { TreeItemJSON } from "services/getTree";
import TransformUtils from ".";

const mockInputTree: Record<string, TreeItemJSON> = {
  "0": {
    id: "2469bdab-23b5-4cb8-90c9-c609a49410b0",
    name: "Richard Paul M.",
    children: {
      "0": {
        id: "97cd3a19-0f1c-4248-a84c-a1f5a0093a89",
        name: "Luis F. Doris",
        children: {},
      },
    },
  },
};

describe("TransformUtils", () => {
  describe("transformTreeJSON", () => {
    it("should transform the input JSON tree to a usable format", () => {
      expect(TransformUtils.transformTreeJSON(mockInputTree)).toMatchObject({
        "2469bdab-23b5-4cb8-90c9-c609a49410b0": {
          id: "2469bdab-23b5-4cb8-90c9-c609a49410b0",
          name: "Richard Paul M.",
          parentPath: [],
          isSelected: false,
          isOpen: false,
          childItems: {
            "97cd3a19-0f1c-4248-a84c-a1f5a0093a89": {
              id: "97cd3a19-0f1c-4248-a84c-a1f5a0093a89",
              name: "Luis F. Doris",
              parentPath: ["2469bdab-23b5-4cb8-90c9-c609a49410b0"],
              childItems: {},
              isSelected: false,
              isOpen: false,
            },
          },
        },
      });
    });
  });
  describe("setIdsAsKeys", () => {
    it("should replace the current keys with the items ids", () => {
      expect(TransformUtils.setIdsAsKeys(mockInputTree)).toEqual({
        "2469bdab-23b5-4cb8-90c9-c609a49410b0": {
          id: "2469bdab-23b5-4cb8-90c9-c609a49410b0",
          name: "Richard Paul M.",
          children: {
            "0": {
              id: "97cd3a19-0f1c-4248-a84c-a1f5a0093a89",
              name: "Luis F. Doris",
              children: {},
            },
          },
        },
      });
    });
  });
});
