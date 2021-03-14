import React from 'react';
import PropTypes from 'prop-types';

import EditLab from './EditLab';

function EditLabContainer(props) {
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

  const methods = {};

  return <EditLab {...{ ..._props, ...methods }} />;
}

EditLabContainer.propTypes = {
  navigation: PropTypes.object,
};

export default EditLabContainer;
