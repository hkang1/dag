export interface Node {
  key: string;
  parentKey?: string;

  title: string;
  description?: string;

  depth: number;
  links?: Node['key'][];
  maxPathLength?: number;
}

export type Path = Node['key'][];
