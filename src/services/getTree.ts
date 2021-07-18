import { TreeItemData } from "components/TreeItem";
import data from "mocks/data.json";
import TransformUtils from "utils/TransformUtils";

export interface TreeItemJSON {
  id: string;
  name: string;
  children: Record<string, TreeItemJSON>;
}

export const getTree = (): Record<string, TreeItemData> => {
  return TransformUtils.transformTreeJSON(data);
};
