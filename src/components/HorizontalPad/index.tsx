import { Box } from "@chakra-ui/react";

interface HorizontalPadProps {
  depth: number;
}

const HorizontalPad: React.FC<HorizontalPadProps> = ({ children, depth }) => {
  const padding = depth * 8;
  return <Box pl={`${padding}px`}>{children}</Box>;
};

export default HorizontalPad;
