import { Config } from './config';
import { Configuration } from './config/config.types';
import { RecursivePartial } from './dag.types';
import { Data, Node } from './data';
import { Interaction } from './interaction';
import { Layout } from './layout';

class DAG {
  #config: Config;
  #data: Data;
  #layout: Layout;
  #interaction: Interaction;

  constructor (elBase: HTMLElement, nodes: Node[], config: RecursivePartial<Configuration> = {}) {
    this.#config = new Config(config);
    this.#data = new Data(nodes);
    this.#layout = new Layout(elBase, this.#data, this.#config);
    this.#interaction = new Interaction(elBase, this.#layout);
  }

  public render() {
    this.#layout.render();
  }

  public update() {
    this.#layout.update();
  }
}

export default DAG;
