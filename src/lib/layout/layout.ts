import { Config } from '../config';
import { Data } from '../data';

import { Arrow } from './arrow';
import { Grid } from './grid';
import css from './layout.module.css';
import { addElement, getArrowKey, getCoordKey } from './layout.utils';
import { Node } from './node';

class Layout {
  #elBase: HTMLElement;
  #data: Data;
  #config: Config;

  #canvas: HTMLCanvasElement;

  #grid: Grid;
  #nodeKeyMap: Record<string, string>;
  #nodeMap: Record<string, Node>;
  #arrowMap: Record<string, Arrow>;

  constructor(elBase: HTMLElement, data: Data, config: Config) {
    this.#elBase = elBase;
    this.#data = data;
    this.#config = config;

    this.#canvas = addElement('canvas', this.#elBase, { className: css.canvas, tagName: 'canvas' });

    this.#grid = new Grid(this.#canvas, this.#data, this.#config);
    this.#nodeKeyMap = {};
    this.#nodeMap = {};
    this.#arrowMap = {};
  }

  public render() {
    this.#grid.render();

    // We render arrows before the nodes to layer nodes on top of arrows.
    for (const key in this.#arrowMap) {
      this.#arrowMap[key].render();
    }

    for (const key in this.#nodeMap) {
      this.#nodeMap[key].render();
    }
  }

  public resize() {
    const rect = this.#elBase.getBoundingClientRect();
    this.#canvas.width = rect.width;
    this.#canvas.height = rect.height;
  }

  public update() {
    this.#grid.update();

    const grid = this.#data.grid;

    for (let x = 0; x < grid.length; x++) {
      for (let y = 0; y < grid[x].length; y++) {
        const key = getCoordKey({ x, y });
        const node = this.#data.getNode(grid[x][y] ?? '');
        if (!node) continue;

        const { x: left, y: top } = this.#grid.getPosition({ x, y });
        this.#nodeKeyMap[node.key] = key;
        this.#nodeMap[key] = new Node(
          this.#canvas,
          { left, title: node.title, top, x, y },
          this.#config,
        );
        this.#nodeMap[key].update();
      }
    }

    for (const nodeData of this.#data.nodeList) {
      const key = this.#nodeKeyMap[nodeData.key];
      const node = this.#nodeMap[key];

      for (const link of nodeData.links ?? []) {
        const linkKey = this.#nodeKeyMap[link];
        const linkNode = this.#nodeMap[linkKey];
        const arrowKey = getArrowKey(node, linkNode);

        this.#arrowMap[arrowKey] = new Arrow(this.#canvas, { from: node, to: linkNode }, this.#config);
      }
    }
  }
}

export default Layout;
