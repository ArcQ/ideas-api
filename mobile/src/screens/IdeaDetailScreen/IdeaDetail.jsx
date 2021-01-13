import { Image, SafeAreaView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import PropTypes from 'prop-types';
import React from 'react';

import { getFormattedDate } from '../../utils/dateUtil';
import gStyle from '../../constants/gStyle';
import CloseButton from '../../components/buttons/CloseButton';
import Loader from '../../components/Loader';
import colors from '../../constants/colors';

const style = {
  title: {
    ...gStyle.textBold20,
    marginTop: 30,
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
          <Text style={style.desc} numberOfLines={4} ellipsizeMode="tail">
            {props.idea.desc}
          </Text>
          <Text style={style.subHeader}>Notes</Text>
          <Text style={style.notes} numberOfLines={4} ellipsizeMode="tail">
            {props.idea.notes}
          </Text>
          <View>
            <Text
              style={style.subHeader}
              numberOfLines={4}
              ellipsizeMode="tail"
            >
              Posted by
            </Text>
            <Image
              style={style.tinyLogo}
              source={{
                uri: props.idea.lab.imageUrl,
              }}
            />
            <Text
              style={style.createdBy}
              numberOfLines={4}
              ellipsizeMode="tail"
            >
              {props.idea.createdBy.username}
            </Text>
          </View>
          <Text style={style.createdAt}>
            {getFormattedDate(props.idea.createdAt)}
          </Text>
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
  onClosePress: PropTypes.func,
};
