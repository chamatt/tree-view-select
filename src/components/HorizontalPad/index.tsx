import { Box } from "@chakra-ui/react";

interface HorizontalPadProps {
  depth: number;
}

const HorizontalPad: React.FC<HorizontalPadProps> = ({ children, depth }) => {
  const padding = depth * 16;
  return (
    <Box pl={`${padding}px`} data-testid={`depth-${depth}`}>
      {children}
    </Box>
  );
};

export default HorizontalPad;
