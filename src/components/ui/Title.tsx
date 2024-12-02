import React from 'react';
import CustomText from './Text';

interface Props {
  title: string;
}

export default function Title({title}: Props) {
  return (
    <CustomText fs={32} fw="semibold">
      {title}
    </CustomText>
  );
}
