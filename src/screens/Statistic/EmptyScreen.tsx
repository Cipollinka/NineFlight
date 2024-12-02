import {View} from 'react-native';
import React from 'react';
import LogoIcon from '@/assets/icons/empty-statistic.svg';
import CustomText from '@/components/ui/Text';

export default function EmptyScreen() {
  return (
    <View
      style={{width: '100%', alignItems: 'center', marginTop: '35%', gap: 32}}>
      <LogoIcon />
      <CustomText fw="semibold" fs={18}>
        No stats yet, add some flights
      </CustomText>
    </View>
  );
}
