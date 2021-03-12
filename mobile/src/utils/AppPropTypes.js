import PropTypes from 'prop-types';

const objectOfString = PropTypes.objectOf(PropTypes.string);

const UserPropType = PropTypes.shape({
  username: PropTypes.String,
  firstName: PropTypes.String,
  lastName: PropTypes.String,
  imageUrl: PropTypes.String,
});

const AppPropTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
  style: PropTypes.object,
  errors: PropTypes.object,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      shortDescription: PropTypes.string,
    }),
  ),
  listData: PropTypes.arrayOf(objectOfString),
  objectOfString,
  user: UserPropType,
  idea: PropTypes.shape({
    title: PropTypes.String,
    desc: PropTypes.String,
    notes: PropTypes.String,
    createdBy: UserPropType,
  }),
};

export const MessagePropType = PropTypes.shape({
  id: PropTypes.string,
  text: PropTypes.string,
  user_id: PropTypes.string,
  chat_id: PropTypes.string,
});

export const NavigationPropType = PropTypes.object; // eslint-ignore-line

export const StylePropType = PropTypes.object; // eslint-ignore-line

export default AppPropTypes;
