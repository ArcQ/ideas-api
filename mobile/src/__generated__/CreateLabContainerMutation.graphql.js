/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type IdeaMutationInput = {|
  id?: ?string,
  title: string,
  desc: string,
  notes?: ?string,
  createdById?: ?string,
  labId?: ?string,
  clientMutationId?: ?string,
|};
export type CreateLabContainerMutationVariables = {|
  input: IdeaMutationInput
|};
export type CreateLabContainerMutationResponse = {|
  +idea: ?{|
    +title: ?string,
    +desc: ?string,
    +notes: ?string,
    +lab: ?{|
      +name: string
    |},
    +createdBy: ?{|
      +username: string
    |},
    +errors: ?$ReadOnlyArray<?{|
      +messages: $ReadOnlyArray<string>,
      +field: string,
    |}>,
  |}
|};
export type CreateLabContainerMutation = {|
  variables: CreateLabContainerMutationVariables,
  response: CreateLabContainerMutationResponse,
|};
*/


/*
mutation CreateLabContainerMutation(
  $input: IdeaMutationInput!
) {
  idea(input: $input) {
    title
    desc
    notes
    lab {
      name
      id
    }
    createdBy {
      username
      id
    }
    errors {
      messages
      field
    }
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "desc",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "notes",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "username",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "concreteType": "ErrorType",
  "kind": "LinkedField",
  "name": "errors",
  "plural": true,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "messages",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "field",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CreateLabContainerMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "IdeaMutationPayload",
        "kind": "LinkedField",
        "name": "idea",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "LabNode",
            "kind": "LinkedField",
            "name": "lab",
            "plural": false,
            "selections": [
              (v5/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "UserNode",
            "kind": "LinkedField",
            "name": "createdBy",
            "plural": false,
            "selections": [
              (v6/*: any*/)
            ],
            "storageKey": null
          },
          (v7/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CreateLabContainerMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "IdeaMutationPayload",
        "kind": "LinkedField",
        "name": "idea",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "LabNode",
            "kind": "LinkedField",
            "name": "lab",
            "plural": false,
            "selections": [
              (v5/*: any*/),
              (v8/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "UserNode",
            "kind": "LinkedField",
            "name": "createdBy",
            "plural": false,
            "selections": [
              (v6/*: any*/),
              (v8/*: any*/)
            ],
            "storageKey": null
          },
          (v7/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "09c4bed5ce7712b52e25cb9a0c94c4c0",
    "id": null,
    "metadata": {},
    "name": "CreateLabContainerMutation",
    "operationKind": "mutation",
    "text": "mutation CreateLabContainerMutation(\n  $input: IdeaMutationInput!\n) {\n  idea(input: $input) {\n    title\n    desc\n    notes\n    lab {\n      name\n      id\n    }\n    createdBy {\n      username\n      id\n    }\n    errors {\n      messages\n      field\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '1c6a172139e70ffeede998ebc9096169';

module.exports = node;
