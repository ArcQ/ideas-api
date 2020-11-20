/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type BaseQueryVariables = {||};
export type BaseQueryResponse = {|
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
export type BaseQuery = {|
  variables: BaseQueryVariables,
  response: BaseQueryResponse,
|};
*/


/*
query BaseQuery {
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
    "name": "BaseQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "BaseQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "57d10588537680bc27c14de42a5be872",
    "id": null,
    "metadata": {},
    "name": "BaseQuery",
    "operationKind": "query",
    "text": "query BaseQuery {\n  allIdeas {\n    edges {\n      node {\n        id\n        createdAt\n        updatedAt\n        lab {\n          id\n        }\n        desc\n        title\n        notes\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '70bb71df215431baec887c0605629098';

module.exports = node;
