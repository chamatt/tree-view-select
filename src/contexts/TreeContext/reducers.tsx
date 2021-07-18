import { Action, ToggleOpenPayload, ToggleSelectPayload } from "./actions";
import { State } from ".";
import { TOGGLE_OPEN, TOGGLE_SELECT } from "./types";
import produce from "immer";
import { get, isEmpty, set } from "lodash";
import { TreeItemData } from "components/TreeItem";
import TransformUtils from "utils/TransformUtils";

const findItem = (tree: Record<string, TreeItemData>, path: string[]) => {
  const completePath = TransformUtils.intersperse(path, "childItems");
  return get(tree, completePath);
};

const setItem = (
  tree: Record<string, TreeItemData>,
  path: string[],
  value: TreeItemData
) => {
  const completePath = TransformUtils.intersperse(path, "childItems");
  return set(tree, completePath, value);
};

const areAllSelected = (tree: Record<string, TreeItemData>) => {
  return (
    !isEmpty(tree) &&
    Object.values(tree).every((child: TreeItemData) => child.isSelected)
  );
};

export const isIndeterminate = (tree: Record<string, TreeItemData>) =>
  Object.values(tree).some((child: TreeItemData) => child.isSelected) &&
  !areAllSelected(tree);

const setChildrenSelectStatus = (
  tree: Record<string, TreeItemData>,
  currentPath: string[],
  value: boolean,
  root = false
) => {
  const currentItem: TreeItemData = findItem(tree, currentPath);

  if (!root) {
    setItem(tree, currentPath, {
      ...currentItem,
      isSelected: value,
    });
  }

  Object.values(currentItem?.childItems).forEach((child: TreeItemData) => {
    setChildrenSelectStatus(tree, [...currentPath, child.id], value);
  });
};

const getParentPath = (currentPath: string[]) => {
  if (currentPath?.length === 1) return [];
  return currentPath.slice(0, currentPath?.length - 1);
};

const setParentStatus = (
  tree: Record<string, TreeItemData>,
  currentPath: string[]
) => {
  const parentPath = getParentPath(currentPath);
  const parentItem: TreeItemData = findItem(tree, parentPath);
  if (parentItem) {
    const areAllChildrenSelected = areAllSelected(parentItem.childItems);
    if (areAllChildrenSelected)
      setItem(tree, parentPath, {
        ...parentItem,
        isSelected: true,
      });
    else {
      setItem(tree, parentPath, {
        ...parentItem,
        isSelected: false,
      });
    }
    setParentStatus(tree, parentPath);
  }
};

const selectItem = (state: State, payload: ToggleSelectPayload) => {
  const currentItemPath = [...payload.parentPath, payload.id];
  const currentItem: TreeItemData = findItem(state.tree, currentItemPath);

  if (currentItem) {
    const isSelected = currentItem.isSelected;
    const indeterminate = isIndeterminate(currentItem.childItems);

    if (indeterminate) {
      setChildrenSelectStatus(state.tree, currentItemPath, true, true);
      setItem(state.tree, currentItemPath, {
        ...currentItem,
        isSelected: true,
      });
      setParentStatus(state.tree, currentItemPath);
    } else if (isSelected) {
      setChildrenSelectStatus(state.tree, currentItemPath, false, true);
      setItem(state.tree, currentItemPath, {
        ...currentItem,
        isSelected: false,
      });
      setParentStatus(state.tree, currentItemPath);
    } else {
      setChildrenSelectStatus(state.tree, currentItemPath, true, true);
      setItem(state.tree, currentItemPath, {
        ...currentItem,
        isSelected: true,
      });
      setParentStatus(state.tree, currentItemPath);
    }
  }
};
const openItem = (state: State, payload: ToggleOpenPayload) => {
  const currentItemPath = [...payload.parentPath, payload.id];
  const currentItem = findItem(state.tree, currentItemPath);
  setItem(state.tree, currentItemPath, {
    ...currentItem,
    isOpen: !currentItem.isOpen,
  });
};

export const TreeContextReducer = (state: State, action: Action) => {
  switch (action.type) {
    case TOGGLE_SELECT:
      return produce(state, (draft) => selectItem(draft, action.payload));
    case TOGGLE_OPEN:
      return produce(state, (draft) => openItem(draft, action.payload));
    default:
      return state;
  }
};
