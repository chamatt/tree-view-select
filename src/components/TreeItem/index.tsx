import { Checkbox, Collapse, Flex, Text } from "@chakra-ui/react";
import HorizontalPad from "components/HorizontalPad";
import { useMemo } from "react";

export interface TreeItemData {
  id: string;
  name: string;
  isSelected?: boolean;
  isOpen?: boolean;
  parentPath: string[];
  childItems: Record<string, TreeItemData>;
}

type TreeItemProps = TreeItemData & {
  toggleSelect: () => void;
  toggleOpen: () => void;
};

const TreeItem: React.FC<TreeItemProps> = ({
  id,
  name,
  isOpen = false,
  isSelected = false,
  parentPath = [],
  childItems,
  toggleSelect,
  toggleOpen,
}) => {
  const openIndicator = isOpen ? "Close" : "Open";

  const itemPath = useMemo(() => {
    return [...parentPath, name];
  }, [parentPath, name]);

  const allChecked = Object.values(childItems).every(
    (child: TreeItemData) => child.isSelected
  );
  const isIndeterminate =
    Object.values(childItems).some((child: TreeItemData) => child.isSelected) &&
    !allChecked;

  const renderChildItems = () => {
    return Object.values(childItems)?.map((props) => (
      <TreeItem
        key={id}
        {...props}
        parentPath={itemPath}
        toggleOpen={() => {}}
        toggleSelect={() => {}}
      />
    ));
  };

  const depth = useMemo(() => itemPath?.length, [itemPath]);

  return (
    <>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        cursor="pointer"
        _hover={{
          backgroundColor: "#3333",
        }}
      >
        <Flex alignItems="center">
          <Flex padding="2">
            <Checkbox
              onChange={toggleSelect}
              isChecked={allChecked || isSelected}
              isIndeterminate={isIndeterminate}
            />
          </Flex>
          <Flex padding="2">
            <Text>{name}</Text>
          </Flex>
        </Flex>
        <Flex onClick={toggleOpen}>
          <Text>{openIndicator}</Text>
        </Flex>
      </Flex>
      <HorizontalPad depth={depth}>
        <Collapse in={isOpen} animateOpacity unmountOnExit>
          {renderChildItems()}
        </Collapse>
      </HorizontalPad>
    </>
  );
};

export default TreeItem;
