import { Node, Path } from './data.types';

export function comparePath(a: Path, b: Path): number {
  return b.length - a.length;
}

export function getPaths(node: Node, map: Record<Node['key'], Node>): Path[] {
  const paths: Path[] = [];

  if (!node.links) {
    paths.push([node.key]);
  } else {
    for (const key of node.links ?? []) {
      for (const subPath of getPaths(map[key], map)) {
        paths.push([node.key, ...subPath]);
      }
    }
  }

  return paths;
}
