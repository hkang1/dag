import { Config } from '../../config';
import { getContext } from '../layout.utils';

import { ArrowArgs } from './arrow.types';

class Arrow {
  #canvas: HTMLCanvasElement;
  #args: ArrowArgs;
  #config: Config;

  constructor(canvas: HTMLCanvasElement, args: ArrowArgs, config: Config) {
    this.#canvas = canvas;
    this.#args = args;
    this.#config = config;
  }

  public render() {
    const ctx = getContext(this.#canvas);
    const { from, to } = this.#args;
    const { x: x0, y: y0 } = from.center;
    const { x: x1, y: y1 } = to.center;

    const xHalf = x0 + (x1 - x0) / 2;

    ctx.lineWidth = this.#config.size.arrowLineWidth;
    ctx.strokeStyle = this.#config.style.arrowLineColor;

    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.bezierCurveTo(xHalf, y0, xHalf, y1, x1, y1);
    ctx.stroke();
  }
}

export default Arrow;
