import React, {useEffect, useRef} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
  StyleProp,
  ViewStyle,
} from 'react-native';
import CustomText from './Text';

interface Props {
  title?: string;
  onPress: () => void;
  variant?: 'green';
  style?: StyleProp<ViewStyle>;
  isFullWidth?: boolean;
  fs?: number;
  icon?: React.ReactNode;
  iconAfter?: React.ReactNode;
  isActive?: boolean;
  disabled?: boolean;
}

export default function Button({
  title,
  onPress,
  variant = 'green',
  style,
  fs,
  icon,
  iconAfter,
  isFullWidth,
  isActive,
  disabled,
}: Props) {
  const animatedValue = useRef(new Animated.Value(disabled ? 1 : 0)).current;

  //
  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: disabled ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [disabled]);

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#1DD063', '#12266A'],
  });

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.5],
  });

  return (
    <TouchableOpacity disabled={isActive || disabled} onPress={onPress}>
      <Animated.View
        style={[
          styles.default,
          {
            backgroundColor,
            opacity,
            width: isFullWidth ? '100%' : 'auto',
          },
          style,
        ]}>
        {icon && icon}
        {title && (
          <CustomText fw="bold" style={{fontSize: fs || 16}}>
            {title}
          </CustomText>
        )}
        {iconAfter && iconAfter}
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  default: {
    paddingHorizontal: 16,
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 14,
    gap: 4,
  },
});
