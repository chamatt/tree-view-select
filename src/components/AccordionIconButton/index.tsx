import { IconButton } from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";

interface AccordionIconButtonProps {
  isOpen?: boolean;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
  hidden?: boolean;
}

const AccordionIconButton: React.FC<AccordionIconButtonProps> = ({
  isOpen = false,
  hidden = false,
  onClick,
  ...rest
}) => {
  return (
    <IconButton
      sx={{
        minWidth: 0,
        width: 30,
        height: 30,
      }}
      padding={0}
      aria-label={`accordion button ${isOpen ? "open" : "closed"}`}
      icon={isOpen ? <ChevronUpIcon color="blue.400" /> : <ChevronDownIcon />}
      variant="ghost"
      hidden={hidden}
      onClick={onClick}
      {...rest}
    ></IconButton>
  );
};

export default AccordionIconButton;
