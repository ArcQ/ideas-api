import React from 'react';

import { NavigationPropType } from '../../utils/types';
import Profile from './Profile';

function ProfileContainer(props) {
  const _props = {};

  const methods = {};

  return <Profile {...{ ..._props, ...methods }} />;
}

ProfileContainer.propTypes = {
  navigation: NavigationPropType,
};

export default ProfileContainer;
