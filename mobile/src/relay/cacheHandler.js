import { QueryResponseCache } from 'relay-runtime';

import { fetchGraphql } from '../services/api/apiService';
import { forceFetch, isMutation, isQuery } from './utils';

const oneMinute = 60 * 1000;
const queryResponseCache = new QueryResponseCache({
  size: 250,
  ttl: oneMinute,
});

const cacheHandler = async (request, variables, cacheConfig) => {
  const queryID = request.text || '';

  if (isMutation(request)) {
    queryResponseCache.clear();
    const mutationResult = await fetchGraphql(request, variables);
    console.info('mutation', mutationResult);

    return mutationResult;
  }

  const fromCache = queryResponseCache.get(queryID, variables);
  // console.log('fromCache', queryID, fromCache);

  if (isQuery(request) && fromCache !== null && !forceFetch(cacheConfig)) {
    console.info('from cache', fromCache);

    return fromCache;
  }

  const fromServer = await fetchGraphql(request, variables);
  // console.log('fromServer', fromServer);

  if (fromServer) {
    console.info(request.name, fromServer);

    queryResponseCache.set(queryID, variables, fromServer);
  }

  return fromServer;
};

export default cacheHandler;
