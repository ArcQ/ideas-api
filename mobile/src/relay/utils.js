const operationKind = {
  MUTATION: 'mutation',
  QUERY: 'query',
};

export const isMutation = (request) =>
  request.operationKind === operationKind.MUTATION;

export const isQuery = (request) =>
  request.operationKind === operationKind.QUERY;

export const forceFetch = (cacheConfig) => !!(cacheConfig && cacheConfig.force);

export const relayTransactionLogger = () => (event) => {
  console.info('RELAY: ', event); // eslint-disable-line no-console
};
