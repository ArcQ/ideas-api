/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type JoinLabContainerQueryVariables = {||};
export type JoinLabContainerQueryResponse = {|
  +allLabs: ?{|
    +edges: $ReadOnlyArray<?{|
      +node: ?{|
        +id: string,
        +name: string,
        +chatId: string,
      |}
    |}>
  |}
|};
export type JoinLabContainerQuery = {|
  variables: JoinLabContainerQueryVariables,
  response: JoinLabContainerQueryResponse,
|};
*/


/*
query JoinLabContainerQuery {
  allLabs {
    edges {
      node {
        id
        name
        chatId
      }
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "LabNodeConnection",
    "kind": "LinkedField",
    "name": "allLabs",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "LabNodeEdge",
        "kind": "LinkedField",
        "name": "edges",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "LabNode",
            "kind": "LinkedField",
            "name": "node",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "id",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "name",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "chatId",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "JoinLabContainerQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "JoinLabContainerQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "ae968b890ec2e9300fb62653c81d680d",
    "id": null,
    "metadata": {},
    "name": "JoinLabContainerQuery",
    "operationKind": "query",
    "text": "query JoinLabContainerQuery {\n  allLabs {\n    edges {\n      node {\n        id\n        name\n        chatId\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'd0fa24df10999a7c45a663eb38abe742';

module.exports = node;
