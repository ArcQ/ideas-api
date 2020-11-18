import { QueryRenderer, graphql } from 'react-relay';
import { Text, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import React from 'react';

import relay from '../../relay';
import IdeasList from '../../components/IdeasList';
import gStyle from '../../constants/gStyle';
import BaseBottomTabNavigatorLayout from '../../layouts/BaseBottomTabNavigatorLayout';
import colors from '../../constants/colors';

const styles = {
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    ...gStyle.textLarsBold18,
    color: colors.white,
  },
};

export default function BaseScreen(props) {
  return (
    <QueryRenderer
      environment={relay.environment}
      query={graphql`
        query BaseScreenQuery {
          allIdeas {
            edges {
              node {
                id
                createdAt
                updatedAt
                lab {
                  id
                }
                desc
                title
                notes
              }
            }
          }
        }
      `}
      variables={{}}
      render={({ error, props }) => {
        if (error) {
          return <Text>Error!</Text>;
        }
        if (!props) {
          return <Text>Loading...</Text>;
        }
        return (
          <BaseBottomTabNavigatorLayout disableScroll>
            <View style={styles.container}>
              <Text style={[styles.text]}>BaseScreen</Text>
              <TouchableOpacity
                style={{ padding: 20 }}
                onPress={() => props.goToChat()}
              >
                <Text style={gStyle.listText}>Chats</Text>
              </TouchableOpacity>
              <IdeasList />
            </View>
          </BaseBottomTabNavigatorLayout>
        );
      }}
    />
  );
}

BaseScreen.propTypes = {
  goToChat: PropTypes.func,
};
