import React, { memo } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import {
  AntDesign,
  Entypo,
  Feather,
  Ionicons,
  Octicons,
} from '@expo/vector-icons';
import PropTypes from 'prop-types';

import AppPropTypes from '../../../utils/AppPropTypes';
import { MINI_HIT_SLOP, SMALL_HIT_SLOP } from '../../../constants/hitSlops';
import gStyle from '../../../constants/gStyle';
import colors from '../../../constants/colors';

const style = {
  currentLabSection: {
    borderBottomColor: colors.white50,
    borderBottomWidth: 1,
    width: '100%',
    paddingBottom: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  drawerLink: {
    flexDirection: 'row',
    overflow: 'hidden',
    marginHorizontal: 20,
    paddingVertical: 9,
    marginVertical: 2,
  },
  drawerTitle: {
    marginBottom: 10,
    ...gStyle.subTitle,
    color: colors.white,
    alignSelf: 'flex-start',
  },
  labButtonText: {
    ...gStyle.largeText,
    color: colors.white,
    marginHorizontal: 15,
    alignSelf: 'flex-start',
  },
  labsHeader: { width: '100%' },
  scrollView: {
    backgroundColor: colors.green,
  },
  drawerContentContainer: {
    paddingVertical: 70,
    width: '100%',
    alignItems: 'left',
    backgroundColor: colors.green,
    flex: 1,
    justifyContent: 'center',
  },
  drawerContentBody: {
    padding: 20,
    width: '100%',
  },
  text: {
    ...gStyle.textLarsBold18,
    color: colors.white,
  },
  contentSection: {
    marginBottom: 10,
  },
  editLabButtonText: {
    color: colors.white,
    marginHorizontal: 15,
    alignSelf: 'flex-start',
  },
  editLabButton: {
    zIndex: 10,
    paddingVertical: 3,
    marginBottom: 10,
    backgroundColor: colors.darkGreen,
    borderRadius: 20,
  },
  profileButton: {
    borderRadius: 20,
    backgroundColor: colors.darkGreen,
  },
};

function DrawerLink(props) {
  return (
    <TouchableOpacity
      key={props.id}
      onPress={props.onPress}
      style={style.drawerLink}
    >
      {props.logo}
      <Text style={style.labButtonText} numberOfLines={1} ellipsizeMode="tail">
        {props.text}
      </Text>
    </TouchableOpacity>
  );
}

DrawerLink.propTypes = {
  id: PropTypes.string,
  onPress: PropTypes.func,
  logo: PropTypes.node,
  text: PropTypes.string,
};

function ProfileButton(props) {
  return (
    <TouchableOpacity
      key={props.id}
      hitSlop={MINI_HIT_SLOP}
      onPress={props.onPress}
      style={style.profileButton}
    >
      <Text style={style.labButtonText} numberOfLines={1} ellipsizeMode="tail">
        ArcQ
      </Text>
    </TouchableOpacity>
  );
}

ProfileButton.propTypes = {
  id: PropTypes.string,
  onPress: PropTypes.func,
};

function CreateLabsButton(props) {
  return (
    <TouchableOpacity
      hitSlop={SMALL_HIT_SLOP}
      onPress={props.onPress}
      style={style.editLabButton}
    >
      <Text
        style={style.editLabButtonText}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        <Feather
          name="edit"
          size={15}
          color="white"
          style={{ paddingRight: 15 }}
        />
        Create
      </Text>
    </TouchableOpacity>
  );
}

CreateLabsButton.propTypes = {
  onPress: PropTypes.func,
};

function DrawerContent(props) {
  return (
    <ScrollView style={style.scrollView}>
      <View style={style.drawerContentContainer}>
        <View style={[style.currentLabSection]}>
          <Text style={style.drawerTitle}>Current Lab</Text>
          <DrawerLink
            logo={<Feather name="home" size={20} color="white" />}
            onPress={() => {
              props.onHomePress();
            }}
            text="Return to Lab"
            style={style.labButton}
          />
          <DrawerLink
            logo={<Feather name="edit-2" size={20} color="white" />}
            onPress={() => {
              props.onEditLabsPress();
            }}
            text="Edit Lab"
            style={style.labButton}
          />
          <DrawerLink
            logo={
              <Ionicons
                size={24}
                name="ios-information-circle-outline"
                color="white"
              />
            }
            onPress={() => {
              props.onLabDetailsPress();
            }}
            text="About Lab"
            style={style.labButton}
          />
        </View>
        <View style={style.drawerContentBody}>
          <View style={[gStyle.flexRowSpace, style.labsHeader]}>
            <Text style={style.drawerTitle}>Labs</Text>
            <CreateLabsButton
              onPress={() => {
                props.onCreateLabPress();
              }}
            />
          </View>
          <View style={style.contentSection}>
            {props.myLabs &&
              props.myLabs.map(
                (lab) =>
                  lab.node && (
                    <DrawerLink
                      key={lab.node.id}
                      logo={<Entypo name="lab-flask" size={24} color="white" />}
                      id={lab.node.id}
                      onPress={() => {
                        props.onLabButtonPress(lab.node);
                      }}
                      text={lab.node.name}
                      style={style.labButton}
                    />
                  ),
              )}
            <DrawerLink
              logo={<Ionicons name="ios-add" size={24} color="white" />}
              onPress={() => {
                props.onJoinLabsPress();
              }}
              text="Join a New Lab"
              style={style.labButton}
            />
          </View>
          <Text style={style.drawerTitle}>Profile</Text>
          <ProfileButton
            id="profileLink"
            onPress={() => {
              props.onProfilePress();
            }}
          />
          <DrawerLink
            id="featureLink"
            logo={
              <Octicons
                name="request-changes"
                size={20}
                style={{ padding: 2 }}
                color="white"
              />
            }
            onPress={props.onFeatureRequestPress}
            text="Feature Requests"
            style={style.labButton}
          />
          <DrawerLink
            id="logoutLink"
            logo={
              <AntDesign
                name="logout"
                size={20}
                style={{ padding: 2 }}
                color="white"
              />
            }
            onPress={props.onLogoutPress}
            text="Logout"
            style={style.labButton}
          />
        </View>
      </View>
    </ScrollView>
  );
}

DrawerContent.propTypes = {
  myLabs: PropTypes.arrayOf(AppPropTypes.lab),
  onHomePress: PropTypes.func,
  onLabDetailsPress: PropTypes.func,
  onFeatureRequestPress: PropTypes.func,
  onCreateLabPress: PropTypes.func,
  onJoinLabsPress: PropTypes.func,
  onEditLabsPress: PropTypes.func,
  onLabButtonPress: PropTypes.func,
  onProfilePress: PropTypes.func,
  onLogoutPress: PropTypes.func,
};

export default memo(DrawerContent);
