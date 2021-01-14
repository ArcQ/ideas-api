/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type IdeaDetailContainerQueryVariables = {|
  ideaId: string
|};
export type IdeaDetailContainerQueryResponse = {|
  +idea: ?{|
    +id: string,
    +createdAt: any,
    +updatedAt: any,
    +lab: {|
      +id: string,
      +imageUrl: string,
    |},
    +createdBy: ?{|
      +username: string,
      +firstName: string,
      +lastName: string,
      +imageUrl: string,
    |},
    +desc: string,
    +title: string,
    +notes: string,
  |}
|};
export type IdeaDetailContainerQuery = {|
  variables: IdeaDetailContainerQueryVariables,
  response: IdeaDetailContainerQueryResponse,
|};
*/


/*
query IdeaDetailContainerQuery(
  $ideaId: ID!
) {
  idea(id: $ideaId) {
    id
    createdAt
    updatedAt
    lab {
      id
      imageUrl
    }
    createdBy {
      username
      firstName
      lastName
      imageUrl
      id
    }
    desc
    title
    notes
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "ideaId"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "ideaId"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "createdAt",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "updatedAt",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "imageUrl",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "concreteType": "LabNode",
  "kind": "LinkedField",
  "name": "lab",
  "plural": false,
  "selections": [
    (v2/*: any*/),
    (v5/*: any*/)
  ],
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "username",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "firstName",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lastName",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "desc",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "notes",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "IdeaDetailContainerQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "IdeaNode",
        "kind": "LinkedField",
        "name": "idea",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v6/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "UserNode",
            "kind": "LinkedField",
            "name": "createdBy",
            "plural": false,
            "selections": [
              (v7/*: any*/),
              (v8/*: any*/),
              (v9/*: any*/),
              (v5/*: any*/)
            ],
            "storageKey": null
          },
          (v10/*: any*/),
          (v11/*: any*/),
          (v12/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "IdeaDetailContainerQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "IdeaNode",
        "kind": "LinkedField",
        "name": "idea",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v6/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "UserNode",
            "kind": "LinkedField",
            "name": "createdBy",
            "plural": false,
            "selections": [
              (v7/*: any*/),
              (v8/*: any*/),
              (v9/*: any*/),
              (v5/*: any*/),
              (v2/*: any*/)
            ],
            "storageKey": null
          },
          (v10/*: any*/),
          (v11/*: any*/),
          (v12/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "5f15f2b4497258f9f6598b4f370a8226",
    "id": null,
    "metadata": {},
    "name": "IdeaDetailContainerQuery",
    "operationKind": "query",
    "text": "query IdeaDetailContainerQuery(\n  $ideaId: ID!\n) {\n  idea(id: $ideaId) {\n    id\n    createdAt\n    updatedAt\n    lab {\n      id\n      imageUrl\n    }\n    createdBy {\n      username\n      firstName\n      lastName\n      imageUrl\n      id\n    }\n    desc\n    title\n    notes\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '53acfc85fe1641852cb668465860cb63';

module.exports = node;
