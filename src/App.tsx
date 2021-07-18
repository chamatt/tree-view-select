import { ChakraProvider, Text } from "@chakra-ui/react";
import { Container } from "@chakra-ui/react";
import theme from "./themes";
import { getTree } from "services/getTree";
import TreeView from "components/TreeView";
import { useMemo } from "react";

const App = () => {
  const initialTree = useMemo(() => {
    return getTree();
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Container>
        <Text fontSize="2xl" align="center" p="2">
          Tree View
        </Text>
        <TreeView id="teste" initialTree={initialTree} />
      </Container>
    </ChakraProvider>
  );
};

export default App;
