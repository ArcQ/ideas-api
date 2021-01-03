/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type IdeasListContainerQueryVariables = {||};
export type IdeasListContainerQueryResponse = {|
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
export type IdeasListContainerQuery = {|
  variables: IdeasListContainerQueryVariables,
  response: IdeasListContainerQueryResponse,
|};
*/


/*
query IdeasListContainerQuery {
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
    "name": "IdeasListContainerQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "IdeasListContainerQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "a06ab01bd17230cd57593cb74d47ee34",
    "id": null,
    "metadata": {},
    "name": "IdeasListContainerQuery",
    "operationKind": "query",
    "text": "query IdeasListContainerQuery {\n  allIdeas {\n    edges {\n      node {\n        id\n        createdAt\n        updatedAt\n        lab {\n          id\n        }\n        desc\n        title\n        notes\n      }\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '4ff431516fb09f2bb5b2277bdbadca49';

module.exports = node;
