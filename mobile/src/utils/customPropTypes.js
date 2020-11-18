import PropTypes from 'prop-types';

const objectOfString = PropTypes.objectOf(PropTypes.string);

const CustomPropTypes = {
  navigation: PropTypes.object,
  errors: PropTypes.object,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      shortDescription: PropTypes.string,
    }),
  ),
  listData: PropTypes.arrayOf(objectOfString),
  objectOfString,
};

export default CustomPropTypes;
