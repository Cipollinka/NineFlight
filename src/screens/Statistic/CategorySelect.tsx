import {View, Text, TouchableOpacity, Animated, StyleSheet} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {STATISTIC_CATEGORY} from '@/types/common';
import CustomText from '@/components/ui/Text';

interface Props<T> {
  currentTab: T;
  onChangeTab: (tab: T) => void;
}

const categories = [
  {
    label: 'Week',
    value: STATISTIC_CATEGORY.WEEK,
  },
  {
    label: 'Month',
    value: STATISTIC_CATEGORY.MONTH,
  },
  {
    label: 'Year',
    value: STATISTIC_CATEGORY.YEAR,
  },
  {
    label: 'All',
    value: STATISTIC_CATEGORY.ALL,
  },
];

export default function CategorySelect<T extends number>({
  currentTab,
  onChangeTab,
}: Props<T>) {
  const indicatorPosition = useRef(new Animated.Value(1)).current;
  const indicatorWidth = 100 / categories.length;

  const handlePress = (index: T) => {
    onChangeTab(index);
    Animated.spring(indicatorPosition, {
      toValue: index,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    Animated.spring(indicatorPosition, {
      toValue: currentTab,
      useNativeDriver: true,
    }).start();
  }, [currentTab, indicatorPosition]);

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <Animated.View
          style={[
            styles.indicator,
            {
              transform: [
                {
                  translateX: indicatorPosition.interpolate({
                    inputRange: [0, 1, 2, 3],
                    outputRange: [
                      0,
                      indicatorWidth * 3.4,
                      indicatorWidth * 6.9,
                      indicatorWidth * 10.2,
                    ],
                  }),
                },
              ],
              width: `${indicatorWidth}%`,
            },
          ]}
        />
        {categories.map(tab => (
          <TouchableOpacity
            key={tab.value}
            style={styles.tab}
            // @ts-ignore
            onPress={() => handlePress(tab.value)}>
            <CustomText
              fs={14}
              color={currentTab === tab.value ? '#fff' : '#fff'}>
              {tab.label}
            </CustomText>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#0B1948',
    borderRadius: 14,
    overflow: 'hidden',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 6,
  },
  selectedText: {
    color: '#000',
  },
  indicator: {
    position: 'absolute',
    height: '100%',
    backgroundColor: '#1DD063',
    borderRadius: 14,
  },
});
