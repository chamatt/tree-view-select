import { TreeItemData } from "components/TreeItem";
import { isEmpty, mapValues, pick } from "lodash";
import { TreeItemJSON } from "services/getTree";

class TransformUtils {
  static transformTreeJSON = (
    inputTree: Record<string, TreeItemJSON>,
    parentPath: string[] = []
  ): Record<string, TreeItemData> => {
    const transformedLevel = TransformUtils.setIdsAsKeys(inputTree);

    return mapValues(transformedLevel, (item: TreeItemJSON) => {
      const childItems = isEmpty(item.children)
        ? {}
        : TransformUtils.transformTreeJSON(item.children, [
            ...parentPath,
            item.id,
          ]);

      const newItem: TreeItemData = {
        ...pick(item, ["id", "name"]),
        childItems,
        isOpen: false,
        isSelected: false,
        parentPath,
      };
      return newItem;
    });
  };

  static setIdsAsKeys = (
    obj: Record<string, TreeItemJSON>
  ): Record<string, TreeItemJSON> => {
    return Object.values(obj).reduce(
      (previous, current) => ({ ...previous, [current.id]: current }),
      {}
    );
  };

  static intersperse(arr: any[], sep: any): any[] {
    return arr.reduce((a, v) => [...a, v, sep], []).slice(0, -1);
  }
}

export default TransformUtils;
