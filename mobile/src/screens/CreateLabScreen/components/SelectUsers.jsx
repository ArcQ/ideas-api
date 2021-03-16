import PropTypes from 'prop-types';

import AppPropTypes from '../../../utils/AppPropTypes';

export default function SelectUsers(props) {
  return null;
}

SelectUsers.propTypes = {
  navigation: AppPropTypes.navigation,
  createMortgageReferral: PropTypes.func,
  isLoading: PropTypes.bool,
  requestRvpList: PropTypes.func,
};
