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
export type CreateIdeaContainerMutationVariables = {|
  input: IdeaMutationInput
|};
export type CreateIdeaContainerMutationResponse = {|
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
export type CreateIdeaContainerMutation = {|
  variables: CreateIdeaContainerMutationVariables,
  response: CreateIdeaContainerMutationResponse,
|};
*/


/*
mutation CreateIdeaContainerMutation(
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
    "name": "CreateIdeaContainerMutation",
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
    "name": "CreateIdeaContainerMutation",
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
    "cacheID": "86659f383b80b69b0b730d71e48c257d",
    "id": null,
    "metadata": {},
    "name": "CreateIdeaContainerMutation",
    "operationKind": "mutation",
    "text": "mutation CreateIdeaContainerMutation(\n  $input: IdeaMutationInput!\n) {\n  idea(input: $input) {\n    title\n    desc\n    notes\n    lab {\n      name\n      id\n    }\n    createdBy {\n      username\n      id\n    }\n    errors {\n      messages\n      field\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'a9f864373451b3ae903bdf22b5c2af75';

module.exports = node;
