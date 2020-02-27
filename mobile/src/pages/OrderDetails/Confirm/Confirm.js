import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RNCamera } from 'react-native-camera';
import { View, ActivityIndicator, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '~/services/api';

import StackTitle from '~/components/StackTitle/StackTitle';
import {
  Container,
  UpperContent,
  CameraContent,
  CameraButton,
  SubmitButton,
} from './styles';

export default function Confirm({ navigation, route }) {
  const { order } = route.params;
  const profile = useSelector(state => state.user.profile);
  const [picture, setPicture] = useState(null);
  const [loading, setLoading] = useState(false);

  async function takePicture(camera) {
    const options = { quality: 0.5, base64: true };

    setLoading(true);

    const data = await camera.takePictureAsync(options);
    //  eslint-disable-next-line
    const dataSend = new FormData();

    dataSend.append('file', {
      uri: data.uri,
      type: 'image/jpg',
      name: 'image.jpg',
    });
    const response = await api.post('files', dataSend);
    setPicture(response.data.id);
    setLoading(false);
  }

  async function sendPicture() {
    setLoading(true);
    await api.put(`/deliveryman/${profile.id}/${order.id}`, {
      end_date: new Date(),
      signature_id: picture,
    });

    setLoading(false);
    Alert.alert('Entrega efetuada com sucesso!');
    navigation.navigate('Dashboard');
  }

  return (
    <Container>
      <StackTitle
        title="Confirmar entrega"
        goBack={() => navigation.navigate('Details')}
      />

      <UpperContent />
      <CameraContent
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        androidRecordAudioPermissionOptions={{
          title: 'Permission to use audio recording',
          message: 'We need your permission to use your audio',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
      >
        {({ camera, status }) => {
          if (status !== 'READY') return <View />;
          return (
            <View
              style={{
                flex: 0,
                flexDirection: 'row',
                justifyContent: 'center',
              }}
            >
              {!loading && (
                <CameraButton onPress={() => takePicture(camera)}>
                  <Icon name="camera-alt" size={25} color="#FFF" />
                </CameraButton>
              )}
            </View>
          );
        }}
      </CameraContent>
      {loading && (
        <ActivityIndicator
          style={{ marginTop: 20 }}
          size="large"
          color="#7d41e7"
        />
      )}
      {picture && !loading && (
        <SubmitButton bgColor="#7d41e7" onPress={sendPicture}>
          Enviar
        </SubmitButton>
      )}
    </Container>
  );
}
