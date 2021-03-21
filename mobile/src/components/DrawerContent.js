import {
  AntDesign,
  Entypo,
  Feather,
  Ionicons,
  Octicons,
} from '@expo/vector-icons';
import { Auth } from 'aws-amplify';
import { Text, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import { graphql } from 'react-relay';
import { useQuery } from 'relay-hooks';
import React from 'react';

import {
  CREATE_LAB_ROUTE,
  EDIT_LAB_ROUTE,
  HOME_ROUTE,
  INVITE_TO_LAB_ROUTE,
  JOIN_LAB_ROUTE,
  PROFILE_ROUTE,
} from '../constants/routes';
import { MINI_HIT_SLOP, SMALL_HIT_SLOP } from '../constants/hitSlops';
import gStyle from '../constants/gStyle';
import colors from '../constants/colors';

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
  drawerContentContainer: {
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

const drawerContentQuery = graphql`
  query DrawerContentQuery {
    allLabs {
      edges {
        node {
          id
          name
          chatId
        }
      }
    }
  }
`;

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
  const drawerContentQueryProps = useQuery(drawerContentQuery, {
    ideaId: 'SWRlYU5vZGU6NGViOWNiOTMtYjExNi00M2RhLWFmNjgtOTNiOTJhMjAwNGNl',
  });

  const allLabs = drawerContentQueryProps?.data?.allLabs.edges;

  const methods = {
    onHomePress: () => {
      props.navigation.navigate(HOME_ROUTE);
    },
    onInviteToLabPress: () => {
      props.navigation.navigate(INVITE_TO_LAB_ROUTE);
    },
    onFeatureRequestPress: () => {
      props.navigation.navigate(INVITE_TO_LAB_ROUTE);
    },
    onCreateLabPress: () => {
      props.navigation.navigate(CREATE_LAB_ROUTE);
    },
    onJoinLabsPress: () => {
      props.navigation.navigate(JOIN_LAB_ROUTE);
    },
    onEditLabsPress: () => {
      props.navigation.navigate(EDIT_LAB_ROUTE);
    },
    onLabButtonPress: () => {
      props.navigation.closeDrawer();
    },
    onProfilePress: () => {
      props.navigation.navigate(PROFILE_ROUTE);
    },
    onLogoutPress: async () => {
      try {
        await Auth.signOut();
      } catch (error) {
        console.warn('error signing out: ', error);
      }
    },
  };

  return (
    <View style={style.drawerContentContainer}>
      <View style={[style.currentLabSection]}>
        <Text style={style.drawerTitle}>Current Lab</Text>
        <DrawerLink
          logo={<Feather name="home" size={20} color="white" />}
          onPress={() => {
            methods.onHomePress();
          }}
          text="Return to Lab"
          style={style.labButton}
        />
        <DrawerLink
          logo={<Feather name="edit-2" size={20} color="white" />}
          onPress={() => {
            methods.onEditLabsPress();
          }}
          text="Edit Lab"
          style={style.labButton}
        />
        <DrawerLink
          logo={
            <Ionicons
              name="ios-person-add"
              size={20}
              style={{ padding: 2 }}
              color="white"
            />
          }
          onPress={() => {
            methods.onInviteToLabPress();
          }}
          text="Invite to Lab"
          style={style.labButton}
        />
      </View>
      <View style={style.drawerContentBody}>
        <View style={[gStyle.flexRowSpace, style.labsHeader]}>
          <Text style={style.drawerTitle}>Labs</Text>
          <CreateLabsButton
            onPress={() => {
              methods.onCreateLabPress();
            }}
          />
        </View>
        <View style={style.contentSection}>
          {allLabs &&
            allLabs.map((lab) => (
              <DrawerLink
                logo={<Entypo name="lab-flask" size={24} color="white" />}
                id={lab.node.id}
                onPress={() => {
                  methods.onLabButtonPress(lab.node.id);
                }}
                text={lab.node.name}
                style={style.labButton}
              />
            ))}
          <DrawerLink
            logo={<Ionicons name="ios-add" size={24} color="white" />}
            onPress={() => {
              methods.onJoinLabsPress();
            }}
            text="Join a New Lab"
            style={style.labButton}
          />
        </View>
        <Text style={style.drawerTitle}>Profile</Text>
        <ProfileButton
          id="profileLink"
          onPress={() => {
            methods.onProfilePress();
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
          onPress={methods.onFeatureRequestPress}
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
          onPress={methods.onLogoutPress}
          text="Logout"
          style={style.labButton}
        />
      </View>
    </View>
  );
}

DrawerContent.propTypes = {
  navigation: PropTypes.object,
};

export default DrawerContent;
