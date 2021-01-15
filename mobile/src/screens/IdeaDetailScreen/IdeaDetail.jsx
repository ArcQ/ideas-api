import { SafeAreaView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import PropTypes from 'prop-types';
import React from 'react';

import ActionButtons from './components/ActionButtons';
import AppPropTypes from '../../utils/AppPropTypes';
import gStyle from '../../constants/gStyle';
import CloseButton from '../../components/buttons/CloseButton';
import Loader from '../../components/Loader';
import colors from '../../constants/colors';

const style = {
  title: {
    ...gStyle.textBold20,
    marginTop: 50,
    marginBottom: 20,
    fontSize: 30,
  },
  desc: {
    ...gStyle.textThin20,
    paddingBottom: 10,
  },
  listItem: {
    overflow: 'hidden',
    borderRadius: 20,
    paddingRight: 0,
    marginTop: 14,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.black10,
  },
  subHeader: {
    ...gStyle.subHeader,
  },
  itemText: {
    flex: 1,
    paddingVertical: 16,
    paddingLeft: 16,
    paddingRight: 8,
  },
  closeButton: ({ topInset }) => ({
    position: 'absolute',
    right: 10,
    top: 10 + topInset,
    zIndex: 100,
  }),
};

export default function IdeaDetail(props) {
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView style={gStyle.page}>
      <ActionButtons onDelete={props.onDelete} onEdit={props.onEdit} />
      <CloseButton
        style={style.closeButton({ topInset: insets.top })}
        onPress={() => {
          props.onClosePress();
        }}
      />
      {props.idea ? (
        <View>
          <Text style={style.title} ellipsizeMode="tail">
            {props.idea.title}
          </Text>
          <Text style={style.subHeader}>Description</Text>
          <Text style={style.desc} numberOfLines={4} ellipsizeMode="tail">
            {props.idea.desc}
          </Text>
          <Text style={style.subHeader}>Notes</Text>
          {props.idea.notes && (
            <Text style={style.notes} numberOfLines={4} ellipsizeMode="tail">
              {props.idea.notes}
            </Text>
          )}

          <Text style={style.subHeader} numberOfLines={4} ellipsizeMode="tail">
            Posted by
          </Text>
        </View>
      ) : (
        <Loader />
      )}
    </SafeAreaView>
  );
}

IdeaDetail.propTypes = {
  idea: AppPropTypes.idea,
  onClosePress: PropTypes.func,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
};
