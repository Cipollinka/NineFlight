import {FlexStyle, StyleProp, View, ViewStyle} from 'react-native';
import React from 'react';

export default function Row({
  children,
  gap,
  mt,
  style,
  justify,
}: {
  children: React.ReactNode;
  gap?: number;
  mt?: number;
  style?: StyleProp<ViewStyle>;
  justify?: FlexStyle['justifyContent'];
}) {
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          gap: gap ?? 0,
          alignItems: 'center',
          marginTop: mt ?? 0,
          justifyContent: justify,
        },
        style,
      ]}>
      {children}
    </View>
  );
}
