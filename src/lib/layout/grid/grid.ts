import { Config } from '../../config';
import { Coord } from '../../dag.types';
import { Data } from '../../data';
import { getContext, sharp } from '../layout.utils';

class Grid {
  #canvas: HTMLCanvasElement;
  #data: Data;
  #config: Config;

  #xSegment: number = 0;
  #ySegment: number = 0;

  constructor(canvas: HTMLCanvasElement, data: Data, config: Config) {
    this.#canvas = canvas;
    this.#data = data;
    this.#config = config;
  }

  public getPosition(coord: Coord): Coord {
    return {
      x: sharp((coord.x + 1) * this.#xSegment),
      y: sharp((coord.y + 1) * this.#ySegment),
    };
  }

  public render() {
    const ctx = getContext(this.#canvas);

    ctx.lineWidth = this.#config.style.gridLineWidth;
    ctx.strokeStyle = this.#config.style.gridColor;

    ctx.beginPath();

    for (let i = 1; i <= this.#data.size.width; i++) {
      const x = sharp(i * this.#xSegment);
      ctx.moveTo(x, 0);
      ctx.lineTo(x, this.#canvas.height);
      ctx.stroke();
    }

    for (let j = 1; j <= this.#data.size.height; j++) {
      const y = sharp(j * this.#ySegment);
      ctx.moveTo(0, y);
      ctx.lineTo(this.#canvas.width, y);
      ctx.stroke();
    }

    ctx.closePath();
  }

  public update() {
    const { width: gridWidth, height: gridHeight } = this.#data.size;
    const { width, height } = this.#canvas;

    this.#xSegment = width / (gridWidth + 1);
    this.#ySegment = height / (gridHeight + 1);
  }
}

export default Grid;
