import { toggleOpen, toggleSelect } from "./actions";
import { TOGGLE_OPEN, TOGGLE_SELECT } from "./types";

describe("TreeContext Action Creators", () => {
  describe("toggleOpen", () => {
    it("should return a TOOGLE_OPEN action", () => {
      const mockPayload = { id: "1", parentPath: [] };
      expect(toggleOpen(mockPayload)).toEqual({
        type: TOGGLE_OPEN,
        payload: mockPayload,
      });
    });
  });
  describe("toggleSelect", () => {
    it("should return a TOGGLE_SELECT action", () => {
      const mockPayload = { id: "1", parentPath: [] };
      expect(toggleSelect(mockPayload)).toEqual({
        type: TOGGLE_SELECT,
        payload: mockPayload,
      });
    });
  });
});
