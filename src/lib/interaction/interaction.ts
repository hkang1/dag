import { Layout } from '../layout';

class Interaction {
  #elBase: HTMLElement;
  #layout: Layout;

  #resizeObserver: ResizeObserver;

  constructor(elBase: HTMLElement, layout: Layout) {
    this.#elBase = elBase;
    this.#layout = layout;

    this.#resizeObserver = new ResizeObserver(this.#onResize.bind(this));
    this.#resizeObserver.observe(this.#elBase);
  }

  public cleanup() {
    this.#resizeObserver.unobserve(this.#elBase);
  }

  #onResize(entries: ResizeObserverEntry[]) {
    for (const entry of entries) {
      if (entry.target === this.#elBase) {
        this.#layout.resize();
        this.#layout.update();
        this.#layout.render();
      }
    }
  }
}

export default Interaction;
