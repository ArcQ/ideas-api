/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type DrawerContentQueryVariables = {||};
export type DrawerContentQueryResponse = {|
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
export type DrawerContentQuery = {|
  variables: DrawerContentQueryVariables,
  response: DrawerContentQueryResponse,
|};
*/


/*
query DrawerContentQuery {
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
    "name": "DrawerContentQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "DrawerContentQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "2f78ef4ca3b3d71df38510f4477107d8",
    "id": null,
    "metadata": {},
    "name": "DrawerContentQuery",
    "operationKind": "query",
    "text": "query DrawerContentQuery {\n  allLabs {\n    edges {\n      node {\n        id\n        name\n        chatId\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '419a49550abda414bb05fd7309fc6250';

module.exports = node;
