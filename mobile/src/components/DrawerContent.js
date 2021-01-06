import { Text, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import { graphql } from 'react-relay';
import { useQuery } from 'relay-hooks';
import React from 'react';

import { MINI_HIT_SLOP } from '../constants/hitSlops';
import gStyle from '../constants/gStyle';
import colors from '../constants/colors';

const style = {
  labButton: {
    padding: 5,
  },
  labButtonText: {
    color: colors.white,
    alignSelf: 'flex-start',
  },
  drawerContentContainer: {
    alignItems: 'left',
    padding: 20,
    backgroundColor: colors.purple,
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    ...gStyle.textLarsBold18,
    color: colors.white,
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

function DrawerContent(props) {
  const drawerContentQueryProps = useQuery(drawerContentQuery, {
    ideaId: 'SWRlYU5vZGU6NGViOWNiOTMtYjExNi00M2RhLWFmNjgtOTNiOTJhMjAwNGNl',
  });

  const allLabs = drawerContentQueryProps?.data?.allLabs.edges;

  const methods = {
    onLabButtonPress: () => {
      // props.navigation.goBack();
    },
  };

  return (
    <View style={style.drawerContentContainer}>
      <Text style={style.labButtonText}>Labs</Text>
      {allLabs &&
        allLabs.map((lab) => (
          <TouchableOpacity
            key={lab.node.id}
            hitSlop={MINI_HIT_SLOP}
            onPress={() => {
              methods.onLabButtonPress();
            }}
            style={style.labButton}
          >
            <Text
              style={style.labButtonText}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {lab.node.name}
            </Text>
          </TouchableOpacity>
        ))}
    </View>
  );
}

DrawerContent.propTypes = {
  navigation: PropTypes.object,
};

export default DrawerContent;
