import { Node, Path } from './data.types';

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

export function getOrder(length: number): number[] {
  const start = Math.floor(length / 2);
  const order = [];
  let toggle = 1;
  for (let i = 0; i < length; i++) {
    if (i === 0) {
      order.push(start);
    } else {
      order.push(start + toggle);
      if (toggle > 0) {
        toggle *= -1;
      } else {
        toggle = (-1 * toggle) + 1;
      }
    }
  }
  return order;
}
