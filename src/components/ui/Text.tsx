import React from 'react';
import {Text, StyleSheet, TextStyle, StyleProp} from 'react-native';
import {TextProps} from 'react-native-svg';

interface Props extends TextProps {
  style?: StyleProp<TextStyle>;
  fw?: 'regular' | 'bold' | 'semibold';
  fs?: number;
  align?: 'left' | 'center' | 'right' | 'justify';
  mt?: number;
  color?: string;
  children: React.ReactNode;
}

const fontWeights = {
  regular: 400,
  bold: 700,
  semibold: 600,
};

const CustomText = ({
  style,
  fw = 'regular',
  fs = 16,
  align = 'left',
  mt,
  color,
  ...props
}: Props) => {
  return (
    <Text
      style={[
        styles.text,
        style,
        {
          fontWeight: fontWeights[fw] as any,
          fontSize: fs || 17,
          textAlign: align,
          marginTop: mt || 0,
          color: color || styles.text.color,
        },
      ]}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  text: {
    color: '#fff',
  },
});

export default CustomText;
