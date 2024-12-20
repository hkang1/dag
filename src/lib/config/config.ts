import { Configuration } from './config.types';

class Config {
  #config: Configuration;

  constructor(config: Configuration = {}) {
    this.#config = config;
  }
}

export default Config;
