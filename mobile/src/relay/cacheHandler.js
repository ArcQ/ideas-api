import { QueryResponseCache } from 'relay-runtime';

import { fetchGraphql } from '../services/api/apiService';
import { forceFetch, isMutation, isQuery } from './utils';

const oneMinute = 60 * 1000;
const queryResponseCache = new QueryResponseCache({
  size: 20,
  ttl: oneMinute,
});

const cacheHandler = async (request, variables, cacheConfig) => {
  const queryID = request.name;

  if (isMutation(request)) {
    queryResponseCache.clear();
    const mutationResult = await fetchGraphql(request, variables);
    return mutationResult;
  }

  const fromCache = queryResponseCache.get(queryID, variables);
  if (isQuery(request) && fromCache !== null && !forceFetch(cacheConfig)) {
    return fromCache;
  }

  const fromServer = await fetchGraphql(request, variables);
  if (fromServer) {
    queryResponseCache.set(queryID, variables, fromServer);
  }

  return fromServer;
};

export default cacheHandler;
