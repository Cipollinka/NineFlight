import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import {launchImageLibrary} from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import PlusIcon from '@/assets/icons/plus.svg';
import Row from '@/components/layout/Row';
import CustomText from '@/components/ui/Text';
import {useUserStore} from '@/stores/userStore';

interface Props {
  isEdit: boolean;
  setIsEdit: (isEdit: boolean) => void;
}

export default function Avatar({isEdit, setIsEdit}: Props) {
  const [avatar, setAvatar] = useState('');
  const [username, setUsername] = useState('');

  const avatarGlobal = useUserStore(state => state.avatar);
  const setAvatarGlobal = useUserStore(state => state.setAvatar);

  const usernameGlobal = useUserStore(state => state.username);
  const setUsernameGlobal = useUserStore(state => state.setUsername);

  useEffect(() => {
    if (avatarGlobal) {
      setAvatar(avatarGlobal);
    }
  }, [avatarGlobal]);

  useEffect(() => {
    if (usernameGlobal) {
      setUsername(usernameGlobal);
    }
  }, [usernameGlobal]);

  const isSaveDisabled = !username;

  const handleImageSelection = async () => {
    try {
      // Open the image library
      const result = await launchImageLibrary({
        mediaType: 'photo',
        selectionLimit: 1,
      });

      if (result.didCancel) {
        console.log('User cancelled image picker');
        return;
      }

      if (result.assets && result.assets.length > 0) {
        const sourceUri = result.assets[0].uri; // URI of the selected image
        const fileName = result.assets[0].fileName || `image_${Date.now()}.jpg`; // Generate file name
        const destPath = `${RNFS.DocumentDirectoryPath}/${fileName}`; // Local path

        if (!sourceUri) return;

        await RNFS.copyFile(sourceUri, destPath);
        console.log(`Image saved locally at: ${destPath}`);

        setAvatar(destPath);
      }
    } catch (error) {
      console.error('Error selecting or saving image:', error);
    }
  };

  const handleSave = () => {
    setAvatarGlobal(avatar);
    setUsernameGlobal(username);
    setIsEdit(false);
  };

  if (!isEdit) {
    return (
      <View
        style={{
          marginTop: 24,
        }}>
        <Row gap={20}>
          <Image
            style={{width: 80, height: 80, borderRadius: 9999}}
            src={avatar}
          />
          <CustomText fw="bold" fs={24}>
            {username}
          </CustomText>
        </Row>
      </View>
    );
  }

  return (
    <View>
      <View
        style={{
          backgroundColor: '#0B1948',
          borderRadius: 32,
          padding: 20,
          alignItems: 'center',
          width: '100%',
          gap: 20,
          marginTop: 24,
        }}>
        <TouchableOpacity onPress={handleImageSelection}>
          <View
            style={{
              backgroundColor: '#12266A',
              width: 100,
              height: 100,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 9999,
            }}>
            {avatar ? (
              <Image
                style={{width: 100, height: 100, borderRadius: 9999}}
                src={avatar}
              />
            ) : (
              <PlusIcon />
            )}
          </View>
        </TouchableOpacity>

        <View style={{width: '100%'}}>
          <Input
            style={{
              backgroundColor: '#12266A',
              width: '100%',
              height: 50,
            }}
            value={username}
            onChangeText={setUsername}
            placeholder="Username"
          />
        </View>
        <View style={{width: '100%'}}>
          <Button
            isFullWidth
            title="Save"
            disabled={isSaveDisabled}
            onPress={handleSave}
          />
        </View>
      </View>
    </View>
  );
}
