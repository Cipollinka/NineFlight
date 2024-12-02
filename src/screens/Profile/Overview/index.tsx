import React, {useLayoutEffect, useState} from 'react';
import BackgroundWrapper from '@/components/layout/Wrapper';
import Container from '@/components/layout/Container';
import CustomText from '@/components/ui/Text';
import Title from '@/components/ui/Title';
import BottomNavigation from '@/components/BottomNavigation';
import {Linking, ScrollView, TouchableOpacity, View} from 'react-native';

import PrivacyIcon from '@/assets/icons/privacy.svg';
import WebsiteIcon from '@/assets/icons/website.svg';
import TosIcon from '@/assets/icons/tos.svg';
import WriteIcon from '@/assets/icons/write.svg';
import Row from '@/components/layout/Row';
import {useNavigation} from '@react-navigation/native';
import {Screens, UseNavigationProp} from '@/types/navigation';
import Avatar from './Avatar';
import {useUserStore} from '@/stores/userStore';

interface BlockProps {
  Icon: any;
  title: string;
  onPress: () => void;
}

const Block = ({Icon, title, onPress}: BlockProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          width: 162,
          height: 126,
          borderRadius: 32,
          backgroundColor: '#0B1948',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Icon />

        <CustomText mt={10}>{title}</CustomText>
      </View>
    </TouchableOpacity>
  );
};

export default function ProfileOverview() {
  const nav = useNavigation<UseNavigationProp>();
  const [isEdit, setIsEdit] = useState(false);

  const username = useUserStore(state => state.username);

  useLayoutEffect(() => {
    if (!username) {
      setIsEdit(true);
    }
  }, [username]);

  return (
    <BackgroundWrapper>
      <Container>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Row style={{width: '100%', justifyContent: 'space-between'}}>
            <Title title="Profile" />
            {!isEdit && (
              <TouchableOpacity onPress={() => setIsEdit(true)}>
                <View
                  style={{
                    width: 70,
                    height: 32,
                    borderRadius: 15,
                    borderWidth: 1,
                    borderColor: '#1DD063',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <CustomText color="#1DD063">Edit</CustomText>
                </View>
              </TouchableOpacity>
            )}
          </Row>

          <Avatar isEdit={isEdit} setIsEdit={setIsEdit} />

          <Row style={{flexWrap: 'wrap', gap: 16, marginTop: 24}}>
            <Block
              title="Privacy Policy"
              onPress={() => Linking.openURL('https://www.google.com')}
              Icon={PrivacyIcon}
            />
            <Block
              title="Developer website"
              onPress={() => Linking.openURL('https://www.google.com')}
              Icon={WebsiteIcon}
            />
            <Block
              title="Terms of use"
              onPress={() => Linking.openURL('https://www.google.com')}
              Icon={TosIcon}
            />
            <Block
              title="Write to us"
              onPress={() => nav.navigate(Screens.PROFILE_FEEDBACK)}
              Icon={WriteIcon}
            />
          </Row>

          <View style={{marginBottom: 100}} />
        </ScrollView>
      </Container>
      <BottomNavigation />
    </BackgroundWrapper>
  );
}
