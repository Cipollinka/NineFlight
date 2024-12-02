import {StyleProp, View, ViewStyle} from 'react-native';
import React from 'react';

export default function Container({
  children,
  center,
  style,
}: {
  children: React.ReactNode;
  center?: boolean;
  style?: StyleProp<ViewStyle>;
}) {
  return (
    <View
      style={[
        {
          flex: 1,
          padding: 16,
          alignItems: center ? 'center' : 'flex-start',
          justifyContent: center ? 'center' : 'flex-start',
        },
        style,
      ]}>
      {children}
    </View>
  );
}
