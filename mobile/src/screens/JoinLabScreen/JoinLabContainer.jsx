import { useActionSheet } from '@expo/react-native-action-sheet';
import { graphql } from 'react-relay';
import { useQuery } from 'relay-hooks';
import React from 'react';
import PropTypes from 'prop-types';

import JoinLab from './JoinLab';

const joinLabQuery = graphql`
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
`;

function JoinLabContainer(props) {
  const { showActionSheetWithOptions } = useActionSheet();

  const selectListProps = useQuery(joinLabQuery, {
    ideaId: 'SWRlYU5vZGU6NGViOWNiOTMtYjExNi00M2RhLWFmNjgtOTNiOTJhMjAwNGNl',
  });

  const allLabs = selectListProps?.data?.allLabs.edges;
  const joinLab = () => {};

  const _props = {
    labs: [
      {
        id: '6034f8e2-df82-11ea-87d0-0242ac130003',
        createdAt: '2020-10-10',
        createdByUsername: 'arcq',
        updatedAt: '2020-10-10',
        name: 'base1',
        imageUrl:
          'https://images.unsplash.com/photo-1597476934600-ef660b4ce617?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
      },
      {
        id: '"a510a7cc-df82-11ea-87d0-0242ac130003',
        createdAt: '2020-10-10',
        updatedAt: '2020-10-10',
        createdByUsername: 'arcq',
        name: 'base2',
        imageUrl:
          'https://images.unsplash.com/photo-1597476934600-ef660b4ce617?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80',
      },
    ],
  };

  const methods = {
    onLabPress: (item) => {
      showActionSheetWithOptions(
        {
          options: ['Join Lab', 'Cancel'],
          cancelButtonIndex: 1,
        },
        (buttonIndex) => {
          if (buttonIndex === 0) {
            joinLab(item.id);
          }
        },
      );
    },
    onChangeText: () => {},
  };

  return <JoinLab {...{ ..._props, ...methods }} />;
}

JoinLabContainer.propTypes = {
  navigation: PropTypes.object,
};

export default JoinLabContainer;
