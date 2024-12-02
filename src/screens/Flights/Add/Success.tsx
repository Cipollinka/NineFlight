import React from 'react';
import BackgroundWrapper from '@/components/layout/Wrapper';
import Container from '@/components/layout/Container';
import CustomText from '@/components/ui/Text';
import {View} from 'react-native';
import TicketIcon from '@/assets/icons/ticket.svg';
import Button from '@/components/ui/Button';
import {useNavigation} from '@react-navigation/native';
import {Screens, UseNavigationProp} from '@/types/navigation';

export default function Success() {
  const nav = useNavigation<UseNavigationProp>();

  return (
    <BackgroundWrapper>
      <Container>
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            marginTop: '40%',
            gap: 20,
          }}>
          <CustomText
            fw="semibold"
            fs={32}
            align="center"
            style={{maxWidth: 300}}>
            Your flight successfully added
          </CustomText>
          <TicketIcon />
        </View>
      </Container>

      <Button
        style={{marginTop: 'auto', margin: 16}}
        title="Close"
        onPress={() => nav.navigate(Screens.FLIGHT_OVERVIEW)}
      />
    </BackgroundWrapper>
  );
}
