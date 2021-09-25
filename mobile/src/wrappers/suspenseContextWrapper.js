import React, { Suspense, useContext } from 'react';

import SuspenseScreen from '../screens/SuspenseScreen/SuspenseScreen';
import { QueryContext } from '../context';

// possible fields for contextField: ideasListQueryRef, drawerContentQueryRef
export default function suspenseContextWrapper(contextField) {
  return (Component) => (props) => {
    const contextFields = useContext(QueryContext);
    return (
      <Suspense fallback={<SuspenseScreen />}>
        {contextFields[contextField] ? <Component {...props} /> : null}
      </Suspense>
    );
  };
}
