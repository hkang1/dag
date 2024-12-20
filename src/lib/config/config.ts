import { RecursivePartial } from '../dag.types';

import { DEFAULT_CONFIG } from './config.constants';
import { Configuration } from './config.types';
import { deepMerge } from './config.utils';

class Config {
  #config: Configuration;

  constructor(config: RecursivePartial<Configuration> = {}) {
    this.#config = deepMerge(DEFAULT_CONFIG, config) as Configuration;
  }

  get size() {
    return this.#config.size;
  }

  get style() {
    return this.#config.style;
  }
}

export default Config;
