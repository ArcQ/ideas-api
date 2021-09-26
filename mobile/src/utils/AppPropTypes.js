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

export const MessagePropType = PropTypes.shape({
  id: PropTypes.string,
  text: PropTypes.string,
  user_id: PropTypes.string,
  chat_id: PropTypes.string,
});

export const NavigationPropType = PropTypes.object; // eslint-ignore-line

export const StylePropType = PropTypes.object; // eslint-ignore-line

const AppPropTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
  queryRef: PropTypes.object,
  style: StylePropType,
  errors: PropTypes.object,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      shortDescription: PropTypes.string,
    }),
  ),
  user: UserPropType,
  message: MessagePropType,
  lab: LabPropType,
  listData: PropTypes.arrayOf(objectOfString),
  objectOfString,
  idea: PropTypes.shape({
    title: PropTypes.string,
    desc: PropTypes.string,
    notes: PropTypes.string,
    createdBy: UserPropType,
  }),
  formInput: {
    autoCapitalize: PropTypes.string,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    placeholderTextColor: PropTypes.string,
    style: StylePropType,
    value: PropTypes.any,
    onChangeText: PropTypes.func,
    onSubmitEditing: PropTypes.func,
  },
  buttonWrapper: {
    onPress: PropTypes.func,
    style: StylePropType,
    children: PropTypes.node,
    activeOpacity: PropTypes.number,
    isLink: PropTypes.bool,
  },
};

export default AppPropTypes;
