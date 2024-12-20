import { Config } from '../config';
import { Data } from '../data';

import css from './layout.module.css';
import { addElement } from './layout.utils';

class Layout {
  #elBase: HTMLElement;
  #data: Data;
  #config: Config;

  #canvas: HTMLCanvasElement;
  #ctx: CanvasRenderingContext2D;

  constructor(elBase: HTMLElement, data: Data, config: Config) {
    this.#elBase = elBase;
    this.#data = data;
    this.#config = config;

    this.#canvas = addElement('canvas', this.#elBase, { className: css.canvas, tagName: 'canvas' });

    const ctx = this.#canvas.getContext('2d');
    if (!ctx) throw new Error('Unable to get canvas 2d context!');
    this.#ctx = ctx;
  }

  public render() {
    this.#ctx.fillStyle = 'red';
    this.#ctx.fillRect(0, 0, 150, 75);
  }

  public resize() {
    const rect = this.#elBase.getBoundingClientRect();
    this.#canvas.width = rect.width;
    this.#canvas.height = rect.height;

    const ctx = this.#canvas.getContext('2d');
    if (!ctx) throw new Error('Unable to get canvas 2d context!');
    this.#ctx = ctx;
  }
}

export default Layout;
