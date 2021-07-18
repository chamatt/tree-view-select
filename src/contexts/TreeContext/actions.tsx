import { TOGGLE_OPEN, TOGGLE_SELECT } from "./types";

export type Action = ToggleSelectAction | ToggleOpenAction;

export type ToggleSelectPayload = {
  parentPath: string[];
  id: string;
};
export type ToggleSelectAction = {
  type: typeof TOGGLE_SELECT;
  payload: ToggleSelectPayload;
};

export const toggleSelect = (
  payload: ToggleSelectPayload
): ToggleSelectAction => {
  return {
    type: TOGGLE_SELECT,
    payload,
  };
};

export type ToggleOpenPayload = {
  parentPath: string[];
  id: string;
};
export type ToggleOpenAction = {
  type: typeof TOGGLE_OPEN;
  payload: ToggleOpenPayload;
};

export const toggleOpen = (payload: ToggleOpenPayload): ToggleOpenAction => {
  return {
    type: TOGGLE_OPEN,
    payload,
  };
};
