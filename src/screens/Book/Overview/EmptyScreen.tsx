import {View} from 'react-native';
import React from 'react';
import BookIcon from '@/assets/icons/empty-book.svg';
import CustomText from '@/components/ui/Text';

export default function EmptyScreen() {
  return (
    <View
      style={{width: '100%', alignItems: 'center', marginTop: '35%', gap: 32}}>
      <BookIcon />
      <CustomText fw="semibold" fs={18}>
        No topics yet, please back again later
      </CustomText>
    </View>
  );
}
