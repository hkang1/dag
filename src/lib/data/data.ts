import { Coord } from '../dag.types';

import { Node, Path } from './data.types';
import { comparePath, getPaths } from './data.utils';

class Data {
  #nodeList: Node[];

  #nodeMap: Record<Node['key'], Node>;
  #pathList: Path[];
  #pathMap: Record<Node['key'], Path[]>;
  #depthMap: Record<number, Node['key'][]>;

  #grid: Coord = { x: 0, y: 0 };

  constructor(nodeList: Node[]) {
    this.#nodeList = nodeList;

    this.#nodeMap = {};
    this.#pathList = [];
    this.#pathMap = {};
    this.#depthMap = {};

    this.#init();
  }

  #init() {
    // Create a node map for faster node access.
    for (const node of this.#nodeList) {
      this.#nodeMap[node.key] = node;
    }

    // Traverse nodes to figure out all available paths.
    for (const node of this.#nodeList) {
      const paths = getPaths(node, this.#nodeMap);
      this.#pathList.push(...paths);
      this.#pathMap[node.key] = paths.sort(comparePath);
    }
    this.#pathList = this.#pathList.sort(comparePath);

    // Traverse the paths to figure out the node depths.
    for (const path of this.#pathList) {
      let prevKey: string | undefined;
      for (const [index, key] of path.entries()) {
        const node = this.#nodeMap[key];
        if (isNaN(node.depth)) node.depth = index;
        if (!node.parentKey && prevKey) node.parentKey = prevKey;
        prevKey = key;
      }
    }

    // Group nodes by depth and figure out grid spaces.
    for (const node of this.#nodeList) {
      this.#depthMap[node.depth] = this.#depthMap[node.depth] ?? [];
      this.#depthMap[node.depth].push(node.key);
      this.#grid.x = Math.max(this.#grid.x, node.depth + 1);
      this.#grid.y = Math.max(this.#grid.y, this.#depthMap[node.depth].length + 1);
    }
  }
}

export default Data;
