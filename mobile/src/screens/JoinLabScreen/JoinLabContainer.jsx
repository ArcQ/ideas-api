import { graphql, useMutation, usePreloadedQuery } from 'react-relay';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import JoinLab from './JoinLab';

const labByCodeQuery = graphql`
  query JoinLabContainerQuery($code: String) {
    myLabs(code: $code) {
      edges {
        node {
          id
          code
          createdBy {
            id
            username
          }
          name
          imageUrl
          chatId
        }
      }
    }
  }
`;

const joinLabMutation = graphql`
  mutation JoinLabContainerMutation($input: LabJoinMutationInput!) {
    labJoin(input: $input) {
      id
      createdBy {
        id
      }
      lab {
        id
      }
      status
    }
  }
`;

function JoinLabContainer(props) {
  const [requestJoinF, { loading }] = useMutation(joinLabMutation, {
    onCompleted: ({ labJoin }) => {},
  });

  const [code, setCode] = useState(null);

  const labPreview = usePreloadedQuery(
    labByCodeQuery,
    {
      code,
    },
    { skip: !!code },
  );

  const _props = {};

  const methods = {
    previewLabDetail: (data) => {
      setCode(data.code);
    },
    requestJoin: () => {
      requestJoinF({
        variables: {
          input: [
            {
              labId: labPreview.id,
            },
          ],
        },
      });
    },
  };

  return <JoinLab {...{ ..._props, ...methods }} />;
}

JoinLabContainer.propTypes = {
  navigation: PropTypes.object,
  currentLab: PropTypes.object,
};

export default JoinLabContainer;
