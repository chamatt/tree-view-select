import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Kbd,
  Text,
} from "@chakra-ui/react";

const Header = () => {
  return (
    <Box p="2">
      <Text fontSize="2xl" align="center" p="2">
        Tree View
      </Text>
      <Accordion allowToggle>
        <AccordionItem>
          <h2 >
            <AccordionButton data-testid="keyboard-navigation-header">
              <Box flex="1" textAlign="left">
                Keyboard Navigation
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <div data-testid="keyboard-navigation-content">
              <div>
                Next: <Kbd>tab</Kbd>
              </div>
              <div>
                Previous: <Kbd>shift</Kbd> + <Kbd>tab</Kbd>
              </div>
              <div>
                Select/Open: <Kbd>space</Kbd>
              </div>
            </div>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
};

export default Header;
