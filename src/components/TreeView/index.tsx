import { Box } from "@chakra-ui/react";
import TreeItem from "components/TreeItem";
import { TreeContextProvider, useTree } from "contexts/TreeContext";

const TreeRoot = () => {
  const { state } = useTree();
  return (
    <Box p="2">
      {Object.values(state.tree).map((item) => (
        <TreeItem key={item.id} {...item} />
      ))}
    </Box>
  );
};

const TreeView = ({ id, initialTree }: any) => {
  return (
    <TreeContextProvider id={id} initialTree={initialTree}>
      <TreeRoot />
    </TreeContextProvider>
  );
};

export default TreeView;
