/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type IdeaDetailContainerDeleteMutationVariables = {|
  id: string
|};
export type IdeaDetailContainerDeleteMutationResponse = {|
  +deleteIdea: ?{|
    +ok: ?boolean
  |}
|};
export type IdeaDetailContainerDeleteMutation = {|
  variables: IdeaDetailContainerDeleteMutationVariables,
  response: IdeaDetailContainerDeleteMutationResponse,
|};
*/


/*
mutation IdeaDetailContainerDeleteMutation(
  $id: ID!
) {
  deleteIdea(id: $id) {
    ok
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      }
    ],
    "concreteType": "DeleteIdeaMutation",
    "kind": "LinkedField",
    "name": "deleteIdea",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "ok",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "IdeaDetailContainerDeleteMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "IdeaDetailContainerDeleteMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "44e02b7fdcd26f20a0e0377624dbdb4d",
    "id": null,
    "metadata": {},
    "name": "IdeaDetailContainerDeleteMutation",
    "operationKind": "mutation",
    "text": "mutation IdeaDetailContainerDeleteMutation(\n  $id: ID!\n) {\n  deleteIdea(id: $id) {\n    ok\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '9aced21a859bdcff3ee1e97272ff02ec';

module.exports = node;
