import { ChakraProvider } from "@chakra-ui/react";
import theme from "./themes";

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <div>Placeholder</div>
    </ChakraProvider>
  );
};

export default App;
