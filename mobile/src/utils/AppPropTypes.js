import PropTypes from 'prop-types';

const objectOfString = PropTypes.objectOf(PropTypes.string);

const UserPropType = PropTypes.shape({
  username: PropTypes.String,
  firstName: PropTypes.String,
  lastName: PropTypes.String,
  imageUrl: PropTypes.String,
});

const LabPropType = PropTypes.shape({
  id: PropTypes.String,
  code: PropTypes.String,
  createdBy: UserPropType,
  name: PropTypes.String,
  imageUrl: PropTypes.String,
  chatId: PropTypes.String,
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
  LabPropType,
  listData: PropTypes.arrayOf(objectOfString),
  objectOfString,
  user: UserPropType,
  lab: PropTypes.shape({
    id: PropTypes.String,
    createdAt: PropTypes.String,
    updatedAt: PropTypes.String,
    name: PropTypes.String,
    imageUrl: PropTypes.String,
  }),
  idea: PropTypes.shape({
    title: PropTypes.String,
    desc: PropTypes.String,
    notes: PropTypes.String,
    createdBy: UserPropType,
  }),
  formInput: {
    autoCapitalize: PropTypes.String,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    placeholderTextColor: PropTypes.String,
    style: StylePropType,
    value: PropTypes.any,
    onChangeText: PropTypes.func,
    onSubmitEditing: PropTypes.func,
  },
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
