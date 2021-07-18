import { ChakraProvider, useDisclosure } from "@chakra-ui/react";
import TreeItem, { TreeItemData } from "components/TreeItem";
import { Container } from "@chakra-ui/react";
import theme from "./themes";
import { getTree } from "services/getTree";

const childs: Record<string, TreeItemData> = {
  "string.id": {
    id: "test",
    name: "name",
    isSelected: false,
    isOpen: false,
    childItems: {},
    parentPath: [],
  },
};
const tree = getTree();

const App = () => {
  const { isOpen: isSelected, onToggle: toggleSelect } = useDisclosure({
    defaultIsOpen: false,
  });
  const { isOpen, onToggle: toggleOpen } = useDisclosure({
    defaultIsOpen: false,
  });
  return (
    <ChakraProvider theme={theme}>
      <Container>
        {Object.values(tree).map((item) => (
          <TreeItem
            childItems={childs}
            parentPath={[]}
            isSelected={isSelected}
            isOpen={isOpen}
            toggleOpen={toggleOpen}
            toggleSelect={toggleSelect}
            {...item}
          />
        ))}
      </Container>
    </ChakraProvider>
  );
};

export default App;
