import React from 'react';
import PropTypes from 'prop-types';
import { Clipboard, Text, TouchableOpacity, View } from 'react-native';
import {
  MessageText,
  MessageImage,
  Time,
  utils,
} from 'react-native-gifted-chat';

import device from '../../../constants/device';
import gStyle from '../../../constants/gStyle';
import colors from '../../../constants/colors';

const { isSameUser, isSameDay } = utils;

class MessageBubble extends React.Component {
  constructor(props) {
    super(props);

    this.onLongPress = this.onLongPress.bind(this);
  }

  onLongPress() {
    const { currentMessage, onLongPress } = this.props;

    if (onLongPress) {
      onLongPress(this.context, currentMessage);
    } else if (currentMessage.text) {
      const options = ['Copy Text', 'Cancel'];
      const cancelButtonIndex = options.length - 1;
      const { actionSheet } = this.context;

      actionSheet().showActionSheetWithOptions(
        {
          options,
          cancelButtonIndex,
        },
        (buttonIndex) => {
          switch (buttonIndex) {
            default:
            case 0:
              Clipboard.setString(currentMessage.text);
              break;
          }
        },
      );
    }
  }

  renderMessageText() {
    const { currentMessage, renderMessageText } = this.props;

    if (currentMessage.text) {
      const { ...messageTextProps } = this.props;

      if (renderMessageText) {
        return renderMessageText(messageTextProps);
      }

      return (
        <MessageText
          {...messageTextProps}
          textStyle={{
            left: style.slackMessageText,
          }}
        />
      );
    }

    return null;
  }

  renderMessageImage() {
    const { currentMessage, renderMessageImage } = this.props;

    if (currentMessage.image) {
      const { ...messageImageProps } = this.props;

      if (renderMessageImage) {
        return renderMessageImage(messageImageProps);
      }
      return (
        <MessageImage
          {...messageImageProps}
          imageStyle={[style.slackImage, messageImageProps.imageStyle]}
        />
      );
    }
    return null;
  }

  renderUsername() {
    const { currentMessage, renderUsername } = this.props;

    const username = currentMessage.user.name;

    if (username) {
      const { ...usernameProps } = this.props;

      if (renderUsername) {
        return renderUsername(usernameProps);
      }

      return <Text style={style.usernameText}>{username}</Text>;
    }

    return null;
  }

  renderTime() {
    const { currentMessage, renderTime } = this.props;

    if (currentMessage.createdAt) {
      const { ...timeProps } = this.props;

      if (renderTime) {
        return renderTime(timeProps);
      }

      return (
        <Time
          {...timeProps}
          containerStyle={{ left: [style.containerTime] }}
          textStyle={{ left: [style.timeText, timeProps.textStyle] }}
        />
      );
    }

    return null;
  }

  render() {
    const { currentMessage, previousMessage, touchableProps } = this.props;
    const isSameThread =
      isSameUser(currentMessage, previousMessage) &&
      isSameDay(currentMessage, previousMessage);

    return (
      <View style={style.container}>
        <TouchableOpacity
          accessibilityTraits="text"
          onLongPress={this.onLongPress}
          {...touchableProps}
        >
          <View style={style.containerContent}>
            {isSameThread ? null : (
              <View style={style.containerMsgHeader}>
                {this.renderUsername()}
                {this.renderTime()}
              </View>
            )}
            {this.renderMessageImage()}
            {this.renderMessageText()}
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

MessageBubble.contextTypes = {
  actionSheet: PropTypes.func,
};

MessageBubble.defaultProps = {
  currentMessage: {
    createdAt: null,
    image: null,
    text: null,
  },
  nextMessage: {},
  onLongPress: null,
  previousMessage: {},
  renderMessageImage: null,
  renderMessageText: null,
  renderTime: null,
  renderUsername: null,
  touchableProps: {},
};

MessageBubble.propTypes = {
  currentMessage: PropTypes.object,
  onLongPress: PropTypes.func,
  nextMessage: PropTypes.object,
  previousMessage: PropTypes.object,
  renderMessageImage: PropTypes.func,
  renderMessageText: PropTypes.func,
  renderTime: PropTypes.func,
  renderUsername: PropTypes.func,
  touchableProps: PropTypes.object,
};

const style = {
  container: {
    alignItems: 'flex-start',
    flex: 1,
  },
  containerContent: {
    justifyContent: 'flex-end',
    minHeight: 16,
    paddingRight: 16,
  },
  containerMsgHeader: {
    alignItems: 'baseline',
    flexDirection: 'row',
    marginTop: device.android ? -2 : 0,
  },
  usernameText: {
    ...gStyle.textBold,
    color: colors.blueBlack,
    marginRight: 8,
  },
  containerTime: {
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
  },
  timeText: {
    ...gStyle.textCiruBook12,
    color: colors.greyTime,
  },
  slackImage: {
    borderRadius: 3,
    marginLeft: 0,
    marginRight: 0,
  },
  slackMessageText: {
    ...gStyle.textCiruBook14,
    marginLeft: 0,
    marginRight: 0,
  },
};

export default MessageBubble;
