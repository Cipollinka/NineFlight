import React, {useState} from 'react';
import BackgroundWrapper from '@/components/layout/Wrapper';
import Container from '@/components/layout/Container';
import BackButton from '@/components/BackButton';
import {useNavigation} from '@react-navigation/native';
import {UseNavigationProp} from '@/types/navigation';
import Title from '@/components/ui/Title';
import Label from '@/components/ui/Label';
import {Alert, View} from 'react-native';
import Input from '@/components/ui/Input';
import TextArea from '@/components/ui/TextArea';
import Button from '@/components/ui/Button';

export default function ProfileFeedback() {
  const nav = useNavigation<UseNavigationProp>();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [comment, setComment] = useState('');

  const isSendDisabled = phoneNumber.length < 10 || comment.length < 10;

  const handleSubmit = () => {
    setComment('');
    setPhoneNumber('');

    Alert.alert(
      'Message Sent!',
      'Thank you for reaching out to us. We’ve received your message and will get back to you',
    );
  };

  return (
    <BackgroundWrapper>
      <Container>
        <BackButton onPress={() => nav.goBack()} />
        <Title title="Write to us" />

        <View style={{width: '100%', marginTop: 32}}>
          <Label title="Your phone number" />
          <Input
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder="Text"
          />
        </View>

        <View style={{width: '100%', marginTop: 20}}>
          <Label title="Comment" />
          <TextArea
            value={comment}
            onChangeText={setComment}
            placeholder="Text"
          />
        </View>

        <View style={{width: '100%', marginTop: 'auto'}}>
          <Button
            isFullWidth
            title="Send"
            disabled={isSendDisabled}
            onPress={handleSubmit}
          />
        </View>
      </Container>
    </BackgroundWrapper>
  );
}
