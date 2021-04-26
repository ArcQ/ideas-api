import { connect } from 'react-redux';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';

import PostDetails from '../IdeaDetailScreen/components/PostDetails';
import Loader from '../../components/Loader';
import { appSelectors } from '../../store/app/ducks';
import Button from '../../components/buttons/Button';
import AppPropTypes from '../../utils/AppPropTypes';
import { MINI_HIT_SLOP } from '../../constants/hitSlops';
import colors from '../../constants/colors';
import gStyle from '../../constants/gStyle';

const getStyle = () => ({
  title: {
    fontWeight: '500',
    marginTop: 50,
    marginBottom: 20,
    fontSize: 30,
  },
  desc: {
    ...gStyle.textThin,
    paddingBottom: 10,
  },
  notes: {
    ...gStyle.textThin,
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
});

function LabDetail(props) {
  const style = getStyle();

  return (
    <SafeAreaView>
      <View style={gStyle.containerPadding}>
        {props.lab ? (
          <View>
            <Text
              style={style.subHeader}
              numberOfLines={4}
              ellipsizeMode="tail"
            >
              Image
            </Text>
            <Text style={style.title} ellipsizeMode="tail">
              {props.lab.name}
            </Text>
            <Text style={style.subHeader}>Description</Text>
            <Text
              style={style.subHeader}
              numberOfLines={4}
              ellipsizeMode="tail"
            >
              Created by
            </Text>
            <Text
              style={style.subHeader}
              numberOfLines={4}
              ellipsizeMode="tail"
            >
              Users
            </Text>
          </View>
        ) : (
          <Loader />
        )}
      </View>
    </SafeAreaView>
  );
}

LabDetail.propTypes = {
  lab: AppPropTypes.lab,
};

const mapStateToProps = (state) => ({
  user: appSelectors.user(state),
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(LabDetail);
