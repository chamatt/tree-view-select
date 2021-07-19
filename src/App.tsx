import "focus-visible/dist/focus-visible"
import {
  ChakraProvider,
  Divider,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { Container } from "@chakra-ui/react";
import theme from "./themes";
import { getTree } from "services/getTree";
import TreeView from "components/TreeView";
import { useMemo } from "react";
import Header from "components/Header";

const App = () => {
  const initialTree = useMemo(() => {
    return getTree();
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Container>
        <Header />

        <Text align="center">Each tab keeps track of it's own state</Text>
        <Divider mt="3" />

        <Tabs isFitted variant="line">
          <TabList mb="1em" mx="2">
            <Tab>First</Tab>
            <Tab>Second</Tab>
            <Tab>Third</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <TreeView id="tab-1" initialTree={initialTree} />
            </TabPanel>
            <TabPanel>
              <TreeView id="tab-2" initialTree={initialTree} />
            </TabPanel>
            <TabPanel>
              <TreeView id="tab-3" initialTree={initialTree} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </ChakraProvider>
  );
};

export default App;
