import { Environment, Network, RecordSource, Store } from 'relay-runtime';

import cacheHandler from './cacheHandler';
import { relayTransactionLogger } from './utils';

const __DEV__ = process.env.NODE_ENV === 'development';

const getRelayConfig = () => ({
  configName: new Date().getSeconds().toString(), // temp value for testing
  // network: Network.create(cacheHandler, subscribeGraphql),
  network: Network.create(cacheHandler),
  store: new Store(new RecordSource()),
  log: __DEV__ ? relayTransactionLogger : null,
});

class Relay {
  environment = new Environment(getRelayConfig());

  constructor() {
    this.init();
  }

  init() {
    // eslint-disable-next-line
    if (__DEV__) console.info('relay env instance initialized');
    this.environment = new Environment(getRelayConfig());
  }
}

export default new Relay();
