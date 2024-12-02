import React from 'react';
import ArrowIcon from '@/assets/icons/arrow.svg';
import CustomText from './ui/Text';
import Row from './layout/Row';
import {TouchableOpacity} from 'react-native';

interface Props {
  onPress: () => void;
}

export default function BackButton({onPress}: Props) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Row gap={5} style={{marginBottom: 15, marginLeft: -10}}>
        <ArrowIcon
          color={'#1DD063'}
          style={{transform: [{rotate: '90deg'}]}}
          width={20}
          height={12}
        />
        <CustomText color="#1DD063">Back</CustomText>
      </Row>
    </TouchableOpacity>
  );
}
