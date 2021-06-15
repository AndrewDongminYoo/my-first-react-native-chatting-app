import React from 'react';
import { useEffect} from 'react';
import { Platform, Alert } from 'react-native';
import styled from 'styled-components/native';
import propTypes from 'prop-types';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

const Container = styled.View`
  align-self: center;
  margin-bottom: 30px;
`;

const StyledImage = styled.Image`
  background-color: ${({ theme }) => theme.imageBackground};
  width: 100px;
  height: 100px;
  border-radius: ${({ rounded }) => (rounded ? 50 : 0)}px;
`;

const ButtonContainer = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.imageButtonBackground};
  position: absolute;
  bottom: 0;
  right: 0;
  width: 30px;
  height: 30px;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
`;

const ButtonIcon = styled(MaterialCommunityIcons).attrs({
  name: 'camera-plus',
  size: 22,
})`
  color: ${({ theme }) => theme.imageButtonIcon};
`;

const PhotoButton = ({ onPress }) => {
  return (
    <ButtonContainer onPress={onPress}>
      <ButtonIcon />
    </ButtonContainer>
  )
}

const Image = ({ url, imageStyle, rounded, showButton }) => {

  useEffect(() => {
    (async () => {
      try {
        if (Platform.OS === 'ios') {
          const { status } = await Permissions.askAsync(
            Permissions.CAMERA_ROLL
          );
          if (status !== 'granted') {
            Alert.alert(
              'Photo Permission',
              'Please turn on the Camera roll permissions.'
            );
          }
        }
      } catch (err) {
        Alert.alert('Photo Permission Error', err.message);
      }
    })();
  }, []);

  const _handleEditButton = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      if (!result.cancelled) {
        onChangeImage(result.uri);
      }
    } catch (err) {
      Alert.alert('Photo Error', err.message);
    }
  }

  return (
    <Container>
      <StyledImage
        source={{ uri: url }}
        style={imageStyle}
        rounded={rounded}
      />
      {showButton && <PhotoButton onPress={_handleEditButton} />}
    </Container>
  );
};

Image.defaultProps = {
  rounded : false,
  showButton: false,
}

Image.propTypes = {
  uri: propTypes.string,
  imageStyle: propTypes.object,
  rounded: propTypes.bool,
  showButton: propTypes.bool,
  onChangeImage: propTypes.func,
};

export default Image;