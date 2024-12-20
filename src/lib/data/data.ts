import { Size } from '../dag.types';

import { Node, Path } from './data.types';
import { getOrder, getPaths } from './data.utils';

class Data {
  #nodeList: Node[];

  #nodeMap: Record<Node['key'], Node>;
  #pathList: Path[];
  #pathMap: Record<Node['key'], Path[]>;
  #depthMap: Record<number, Node['key'][]>;

  #size: Size;
  #grid: (string | null)[][];

  constructor(nodeList: Node[]) {
    this.#nodeList = nodeList;

    this.#nodeMap = {};
    this.#pathList = [];
    this.#pathMap = {};
    this.#depthMap = {};

    this.#size = { height: 0, width: 0 };
    this.#grid = [];

    this.#init();
  }

  get grid() {
    return this.#grid;
  }

  get nodeList() {
    return this.#nodeList;
  }

  get size() {
    return this.#size;
  }

  public getNode(key: Node['key']): Node | undefined {
    return this.#nodeMap[key];
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
      this.#pathMap[node.key] = paths.sort(this.#comparePath.bind(this));
    }
    this.#pathList = this.#pathList.sort(this.#comparePath.bind(this));

    // Traverse the paths to figure out the node depths.
    for (const path of this.#pathList) {
      let prevKey: string | undefined;
      for (const [index, key] of path.entries()) {
        const node = this.#nodeMap[key];

        // Calculate node depth relative to the max depth.
        if (isNaN(node.depth)) node.depth = index;
        if (!node.parentKey && prevKey) node.parentKey = prevKey;
        prevKey = key;

        // Calculate the max size of the longest path the node belongs to.
        node.maxPathLength = Math.max(node.maxPathLength ?? 0, path.length);
      }
    }

    // Group nodes by depth and figure out grid spaces.
    for (const node of this.#nodeList) {
      this.#depthMap[node.depth] = this.#depthMap[node.depth] ?? [];
      this.#depthMap[node.depth].push(node.key);
      this.#size.width = Math.max(this.#size.width, node.depth + 1);
      this.#size.height = Math.max(this.#size.height, this.#depthMap[node.depth].length);
    }

    // Sort the nodes within each depth by the longest path.
    for (const index in this.#depthMap) {
      this.#depthMap[index] = this.#depthMap[index].sort((keyA, keyB) => {
        const maxPathLengthA = this.#nodeMap[keyA].maxPathLength ?? 0;
        const maxPathLengthB = this.#nodeMap[keyB].maxPathLength ?? 0;
        return maxPathLengthB - maxPathLengthA;
      });
    }

    // Build the node grid.
    this.#grid = new Array(this.#size.width).fill(null).map(() => new Array(this.#size.height).fill(null));

    const marked: Record<string, boolean> = {};
    for (const path of this.#pathList) {
      for (const [index, key] of path.entries()) {
        if (marked[key]) continue;
        marked[key] = true;

        for (const order of getOrder(this.#grid[index].length)) {
          if (this.#grid[index][order] !== null) continue;
          this.#grid[index][order] = key;
          break;
        }
      }
    }
    console.log('grid', this.#grid);
  }

  #comparePath(a: Path, b: Path) {
    if (a.length === b.length) {
      return (this.#nodeMap[b[0]].links?.length ?? 0) - (this.#nodeMap[a[0]].links?.length ?? 0);
    }
    return b.length - a.length;
  }
}

export default Data;
