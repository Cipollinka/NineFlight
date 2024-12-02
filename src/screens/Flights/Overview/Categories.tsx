import {View, ScrollView, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useMemo} from 'react';
import {FLIGHT_CATEGORY} from '@/types/common';
import Row from '@/components/layout/Row';
import CustomText from '@/components/ui/Text';

interface Category {
  label: string;
  value: FLIGHT_CATEGORY;
}

const allCategories: Category[] = [
  {
    label: 'All',
    value: FLIGHT_CATEGORY.ALL,
  },
  {
    label: 'Economy',
    value: FLIGHT_CATEGORY.ECONOMY,
  },
  {
    label: 'Standard',
    value: FLIGHT_CATEGORY.STANDARD,
  },
  {
    label: 'Business',
    value: FLIGHT_CATEGORY.BUSINESS,
  },
];
const categories: Category[] = [
  {
    label: 'Economy',
    value: FLIGHT_CATEGORY.ECONOMY,
  },
  {
    label: 'Standard',
    value: FLIGHT_CATEGORY.STANDARD,
  },
  {
    label: 'Business',
    value: FLIGHT_CATEGORY.BUSINESS,
  },
];

interface Props {
  currentCategory: FLIGHT_CATEGORY;
  onChange: (value: FLIGHT_CATEGORY) => void;
  excludeAll?: boolean;
}

export default function Categories({
  currentCategory,
  onChange,
  excludeAll,
}: Props) {
  const accessor = useMemo(
    () => (excludeAll ? categories : allCategories),
    [excludeAll],
  );

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{flexGrow: 0, flexShrink: 0}}>
      <Row gap={12}>
        {accessor.map(item => (
          <TouchableOpacity
            key={item.value}
            onPress={() => onChange(item.value)}>
            <View
              style={[
                styles.default,
                currentCategory === item.value
                  ? styles.selected
                  : styles.unselected,
              ]}>
              <CustomText>{item.label}</CustomText>
            </View>
          </TouchableOpacity>
        ))}
      </Row>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  default: {
    borderRadius: 9999,
    paddingVertical: 12,
    paddingHorizontal: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unselected: {
    backgroundColor: '#0B1948',
  },
  selected: {
    backgroundColor: '#1DD063',
  },
});
