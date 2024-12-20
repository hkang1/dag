import { Config } from '../../config';
import { Coord, Size } from '../../dag.types';
import { getContext } from '../layout.utils';

import { NodeArgs } from './node.types';

class Node {
  #canvas: HTMLCanvasElement;
  #config: Config;

  #x: number;
  #y: number;
  #left: number;
  #top: number;
  #title: string;

  #position: Coord;
  #size: Size;
  #textSize: Size;

  constructor(canvas: HTMLCanvasElement, args: NodeArgs, config: Config) {
    this.#canvas = canvas;
    this.#config = config;

    this.#x = args.x;
    this.#y = args.y;
    this.#left = args.left;
    this.#top = args.top;
    this.#title = args.title;

    this.#position = { x: 0, y: 0 };
    this.#size = { height: 0, width: 0 };
    this.#textSize = { height: 0, width: 0 };
  }

  get center() {
    return { x: this.#left, y: this.#top };
  }

  get x() {
    return this.#x;
  }

  get y() {
    return this.#y;
  }

  public render() {
    const ctx = getContext(this.#canvas);

    ctx.fillStyle = this.#config.style.nodeBg;

    ctx.beginPath();
    ctx.roundRect(this.#position.x, this.#position.y, this.#size.width, this.#size.height, [this.#config.size.nodeBorderRadius]);
    ctx.fill();
    ctx.closePath();

    ctx.font = this.#config.style.nodeTitleFont;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = this.#config.style.nodeColor;

    ctx.beginPath();
    ctx.fillText(this.#title, this.#left, this.#top);
    ctx.closePath();
  }

  public update() {
    const ctx = getContext(this.#canvas);

    ctx.font = this.#config.style.nodeTitleFont;

    const textRect = ctx.measureText(this.#title);

    this.#textSize = {
      height: textRect.actualBoundingBoxAscent + textRect.actualBoundingBoxDescent,
      width: textRect.width,
    };
    this.#size = {
      height: this.#textSize.height + 2 * this.#config.size.nodePadding,
      width: this.#textSize.width + 2 * this.#config.size.nodePadding,
    };
    this.#position = {
      x: this.#left - (this.#size.width / 2),
      y: this.#top - (this.#size.height / 2),
    };
  }
}

export default Node;
