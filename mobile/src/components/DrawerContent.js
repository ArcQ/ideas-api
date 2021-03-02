import {
  Entypo,
  Feather,
  Ionicons,
  MaterialCommunityIcons,
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
  PROFILE_ROUTE,
} from '../constants/routes';
import { MINI_HIT_SLOP } from '../constants/hitSlops';
import gStyle from '../constants/gStyle';
import colors from '../constants/colors';

const style = {
  labButton: {
    flexDirection: 'row',
    overflow: 'hidden',
    marginHorizontal: 20,
    paddingVertical: 10,
  },
  drawerTitle: {
    marginBottom: 5,
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
    padding: 20,
    backgroundColor: colors.green,
    flex: 1,
    justifyContent: 'center',
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
    paddingVertical: 3,
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
      hitSlop={MINI_HIT_SLOP}
      onPress={props.onPress}
      style={style.labButton}
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

function EditLabsButton(props) {
  return (
    <TouchableOpacity
      hitSlop={MINI_HIT_SLOP}
      onPress={props.onPress}
      style={style.editLabButton}
    >
      <Text
        style={style.editLabButtonText}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        <Feather name="edit-2" size={15} color="white" />
        Edit
      </Text>
    </TouchableOpacity>
  );
}

EditLabsButton.propTypes = {
  onPress: PropTypes.func,
};

function DrawerContent(props) {
  const drawerContentQueryProps = useQuery(drawerContentQuery, {
    ideaId: 'SWRlYU5vZGU6NGViOWNiOTMtYjExNi00M2RhLWFmNjgtOTNiOTJhMjAwNGNl',
  });

  const allLabs = drawerContentQueryProps?.data?.allLabs.edges;

  const methods = {
    onCreateLabPress: () => {
      props.navigation.navigate(CREATE_LAB_ROUTE);
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
      <View style={[gStyle.flexRowSpace, style.labsHeader]}>
        <Text style={style.drawerTitle}>Labs</Text>
        <EditLabsButton
          onPress={() => {
            methods.onEditLabsPress();
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
            methods.onLabButtonPress();
          }}
          text="Add/Join a New Lab"
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
        id="logoutLink"
        logo={<MaterialCommunityIcons name="logout" size={24} color="white" />}
        onPress={methods.onLogoutPress}
        text="Logout"
        style={style.labButton}
      />
    </View>
  );
}

DrawerContent.propTypes = {
  navigation: PropTypes.object,
};

export default DrawerContent;
