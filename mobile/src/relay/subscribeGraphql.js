// import { Observable } from 'relay-runtime';
// import { SubscriptionClient } from 'subscriptions-transport-ws';

// import envService from '../services/env/envService';

// const url = envService.getConfig().coreApiUrl;

// const subscriptionClient = new SubscriptionClient(`${url}/ws/graphql`, {
//   reconnect: true,
// });

function subscribeGraphQL(/* request, variables */) {
  // Note: https://github.com/facebook/relay/issues/2869#issuecomment-534905537
  // const subscribeObservable = subscriptionClient.request({
  //   query: request.text,
  //   operationName: request.name,
  //   variables,
  // });
  // console.info('Listening...');
  // return Observable.from(subscribeObservable);
}

export default subscribeGraphQL;
