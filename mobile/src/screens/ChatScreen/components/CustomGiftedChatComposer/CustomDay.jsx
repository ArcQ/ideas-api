import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import dayjs from 'dayjs';

import { isSameDay } from '../../../../utils/dateUtil';
import { StylePropType } from '../../../../utils/AppPropTypes';
import colors from '../../../../constants/colors';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    marginBottom: 10,
    flexDirection: 'row',
  },
  text: {
    backgroundColor: colors.white,
    color: colors.black80,
    fontSize: 13,
    fontWeight: '600',
    marginHorizontal: 15,
  },
  line: {
    borderBottomColor: colors.black20,
    borderBottomWidth: 1,
    marginTop: 8,
    marginHorizontal: 5,
    flex: 1,
  },
});

export default function CustomDay(props) {
  const {
    currentMessage,
    previousMessage,
    containerStyle,
    wrapperStyle,
    textStyle,
  } = props;
  if (
    currentMessage &&
    !isSameDay(currentMessage.createdAt, previousMessage.createdAt)
  ) {
    return (
      <View style={[styles.container, containerStyle]}>
        <View style={styles.line} />
        <Text style={[styles.text, textStyle]}>
          {dayjs(currentMessage.createdAt).format('ddd, MMM D, YYYY')}
        </Text>
        <View style={styles.line} />
      </View>
    );
  }
  return null;
}

CustomDay.contextTypes = {
  getLocale: PropTypes.func,
};

CustomDay.defaultProps = {
  currentMessage: {
    createdAt: null,
  },
  previousMessage: {},
  containerStyle: {},
  wrapperStyle: {},
  textStyle: {},
  dateFormat: 'dddd, MMMM D, YYYY',
};

CustomDay.propTypes = {
  currentMessage: PropTypes.object,
  previousMessage: PropTypes.object,
  containerStyle: StylePropType,
  wrapperStyle: StylePropType,
  textStyle: StylePropType,
  dateFormat: PropTypes.string,
};
// # sourceMappingURL=Day.js.map
