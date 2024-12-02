import React from 'react';
import {SafeAreaView} from 'react-native';

export default function BackgroundWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: '#060e2a', position: 'relative'}}>
      {children}
    </SafeAreaView>
  );
}
