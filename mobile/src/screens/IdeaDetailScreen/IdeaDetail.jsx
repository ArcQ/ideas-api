import { SafeAreaView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import PropTypes from 'prop-types';
import React from 'react';

import CloseButton from '../../components/buttons/CloseButton';
import Loader from '../../components/Loader';
import gstyle from '../../constants/gStyle';
import colors from '../../constants/colors';

const style = {
  title: {
    ...gstyle.textBold20,
    paddingVertical: 5,
  },
  desc: {
    ...gstyle.textThin20,
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
  itemText: {
    flex: 1,
    paddingVertical: 16,
    paddingLeft: 16,
    paddingRight: 8,
  },
  replyButton: {
    backgroundColor: colors.black05,
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
  },
  closeButton: ({ topInset }) => ({
    position: 'absolute',
    right: 10,
    top: 10 + topInset,
  }),
};

export default function IdeaDetail(props) {
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView>
      <CloseButton
        style={style.closeButton({ topInset: insets.top })}
        onPress={props.clearAlerts}
      />
      {props.idea ? (
        <View>
          <Text style={style.title} ellipsizeMode="tail">
            {props.idea.title}
          </Text>
          <Text style={style.desc} numberOfLines={4} ellipsizeMode="tail">
            {props.idea.desc}
          </Text>
          <Text style={style.notes} numberOfLines={4} ellipsizeMode="tail">
            {props.idea.notes}
          </Text>
          <View>
            <Text
              style={style.createdBy}
              numberOfLines={4}
              ellipsizeMode="tail"
            >
              Created by
            </Text>
            <Text
              style={style.createdBy}
              numberOfLines={4}
              ellipsizeMode="tail"
            >
              {props.idea.createdBy.username}
            </Text>
          </View>
          <Text style={style.createdAt}>{props.idea.createdAt}</Text>
          <Text style={style.subHeader}>Comments</Text>
        </View>
      ) : (
        <Loader />
      )}
    </SafeAreaView>
  );
}

IdeaDetail.propTypes = {
  idea: PropTypes.object,
};
