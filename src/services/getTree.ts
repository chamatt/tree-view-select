import data from "mocks/data.json";

export interface TreeItemJSON {
  id: string;
  name: string;
  children: Record<string, TreeItemJSON>;
}

export const getTree = (): Record<string, TreeItemJSON> => {
  return data;
};
