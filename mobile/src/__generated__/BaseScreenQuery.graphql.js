/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type BaseScreenQueryVariables = {||};
export type BaseScreenQueryResponse = {|
  +allIdeas: ?{|
    +edges: $ReadOnlyArray<?{|
      +node: ?{|
        +id: string,
        +createdAt: any,
        +updatedAt: any,
        +lab: {|
          +id: string
        |},
        +desc: string,
        +title: string,
        +notes: string,
      |}
    |}>
  |}
|};
export type BaseScreenQuery = {|
  variables: BaseScreenQueryVariables,
  response: BaseScreenQueryResponse,
|};
*/


/*
query BaseScreenQuery {
  allIdeas {
    edges {
      node {
        id
        createdAt
        updatedAt
        lab {
          id
        }
        desc
        title
        notes
      }
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "IdeaNodeConnection",
    "kind": "LinkedField",
    "name": "allIdeas",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "IdeaNodeEdge",
        "kind": "LinkedField",
        "name": "edges",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "IdeaNode",
            "kind": "LinkedField",
            "name": "node",
            "plural": false,
            "selections": [
              (v0/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "createdAt",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "updatedAt",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "LabNode",
                "kind": "LinkedField",
                "name": "lab",
                "plural": false,
                "selections": [
                  (v0/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "desc",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "title",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "notes",
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
    "name": "BaseScreenQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "BaseScreenQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "b28b7b9443bf5ce59ae96254fbbc3432",
    "id": null,
    "metadata": {},
    "name": "BaseScreenQuery",
    "operationKind": "query",
    "text": "query BaseScreenQuery {\n  allIdeas {\n    edges {\n      node {\n        id\n        createdAt\n        updatedAt\n        lab {\n          id\n        }\n        desc\n        title\n        notes\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '258a0fe8840cb8f56c23046cd365ec64';

module.exports = node;
