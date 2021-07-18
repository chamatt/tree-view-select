import { TreeItemData } from "components/TreeItem";
import React, { createContext, useReducer } from "react";
import { Action } from "./actions";
import { TreeContextReducer } from "./reducers";

export interface State {
  id: string;
  tree: Record<string, TreeItemData>;
}

export type Dispatch = (action: Action) => void;

export const TreeContext = createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

export const useTree = () => {
  const context = React.useContext(TreeContext);
  if (context === undefined) {
    throw new Error("useTree must be used within a TreeContextProvider");
  }
  return context;
};

export const TreeContextProvider = ({ id, initialTree, children }: any) => {
  const [state, dispatch] = useReducer(TreeContextReducer, {
    id,
    tree: initialTree,
  });

  return (
    <TreeContext.Provider value={{ state, dispatch }}>
      {children}
    </TreeContext.Provider>
  );
};
