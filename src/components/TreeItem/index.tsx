import { Button, Checkbox, Collapse, Flex, Text } from "@chakra-ui/react";
import HorizontalPad from "components/HorizontalPad";
import { toggleOpen, toggleSelect } from "contexts/TreeContext/actions";
import { useTree } from "contexts/TreeContext";
import { isEmpty } from "lodash";
import React, { useEffect, useMemo, useRef } from "react";
import AccordionIconButton from "components/AccordionIconButton";
import { isIndeterminate } from "contexts/TreeContext/reducers";
export interface TreeItemData {
  id: string;
  name: string;
  isSelected?: boolean;
  isOpen?: boolean;
  parentPath: string[];
  childItems: Record<string, TreeItemData>;
}

const TreeItem: React.FC<TreeItemData> = ({
  id,
  name,
  isOpen,
  isSelected,
  parentPath,
  childItems,
}) => {
  const { dispatch } = useTree();

  const indeterminate = useMemo(() => {
    return isIndeterminate(childItems);
  }, [childItems]);

  const depth = parentPath?.length + 1;

  const handleSelect = () => dispatch(toggleSelect({ id, parentPath }));
  const handleOpen = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    dispatch(toggleOpen({ id, parentPath }));
  };

  // Disabled focus on the checkbox (because you can use the container for that)
  const checkboxRef = useRef<any>(null);
  useEffect(() => {
    checkboxRef.current.tabIndex = -1;
  }, []);

  const renderChildItems = () => {
    return Object.values(childItems)?.map((props) => (
      <TreeItem key={props.id} {...props} />
    ));
  };

  return (
    <React.Fragment key={id}>
      <Button
        data-testid={`tree-item-${id}`}
        borderRadius={0}
        variant="ghost"
        width="100%"
        flex={1}
        justifyContent="space-between"
        alignItems="center"
        cursor="pointer"
        _hover={{
          backgroundColor: "#3331",
        }}
        _active={{
          backgroundColor: "white",
        }}
        onClick={handleSelect}
      >
        <Flex alignItems="center">
          <Flex padding="2">
            <Checkbox
              data-testid={`checkbox-${
                isSelected
                  ? "checked"
                  : indeterminate
                  ? "indeterminate"
                  : "unchecked"
              }-${id}`}
              ref={checkboxRef}
              isReadOnly
              pointerEvents="none"
              isFocusable={false}
              tabIndex={-1}
              onChange={handleSelect}
              isChecked={isSelected}
              isIndeterminate={indeterminate}
            />
          </Flex>
          <Flex padding="2">
            <Text>{name}</Text>
          </Flex>
        </Flex>
        <AccordionIconButton
          isOpen={isOpen}
          hidden={isEmpty(childItems)}
          onClick={handleOpen}
        />
      </Button>
      <HorizontalPad depth={depth}>
        <Collapse in={isOpen} animateOpacity unmountOnExit>
          {renderChildItems()}
        </Collapse>
      </HorizontalPad>
    </React.Fragment>
  );
};

export default TreeItem;
