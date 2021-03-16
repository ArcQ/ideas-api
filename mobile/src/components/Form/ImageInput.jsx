import { Image, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import React from 'react';
import PropTypes from 'prop-types';

import gStyle from '../../constants/gStyle';
import colors from '../../constants/colors';
import { MINI_HIT_SLOP } from '../../constants/hitSlops';

const style = {
  placeholderImage: {
    ...gStyle.grayBorder,
    borderRadius: 50,
    marginTop: 30,
    marginBottom: 20,
    borderWidth: 1,
    width: 100,
    height: 100,
  },
  placeholderImageIcon: {
    position: 'absolute',
    borderRadius: 30,
    backgroundColor: colors.green,
    right: 7,
    paddingleft: 2,
    bottom: 17,
  },
};

export default function ImageInput(props) {
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      props.onSubmitEditing(result.uri);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity
        hitSlop={MINI_HIT_SLOP}
        onPress={() => {
          pickImage();
        }}
        style={style.itemText}
      >
        {props.image ? (
          <Image
            source={{ uri: props.image }}
            style={{ width: 200, height: 200 }}
          />
        ) : (
          <View>
            <View style={style.placeholderImage} />
            <View style={style.placeholderImageIcon}>
              <Ionicons name="ios-add" size={30} color="white" />
            </View>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}

ImageInput.propTypes = {
  // required
  image: PropTypes.object.isRequired,
  setImage: PropTypes.func.isRequired,
  onSubmitEditing: PropTypes.func.isRequired,
};
