import { TreeItemData } from "components/TreeItem";
import React, { createContext, useReducer } from "react";
import { useDebounce, useLocalStorage,  } from "react-use";
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
  const [persistedState, setPersistedState] = useLocalStorage(
    `tree-view-${id}`,
    initialTree
  );

  const [state, dispatch] = useReducer(TreeContextReducer, {
    id,
    tree: persistedState,
  });

  useDebounce(
    () => {
      setPersistedState(state.tree);
    },
    500,
    [state.tree]
  );
  return (
    <TreeContext.Provider value={{ state, dispatch }}>
      {children}
    </TreeContext.Provider>
  );
};
