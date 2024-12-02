import React, {useState} from 'react';
import BackgroundWrapper from '@/components/layout/Wrapper';
import Container from '@/components/layout/Container';
import BackButton from '@/components/BackButton';
import Title from '@/components/ui/Title';
import {useNavigation} from '@react-navigation/native';
import {Screens, UseNavigationProp} from '@/types/navigation';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Label from '@/components/ui/Label';
import Input from '@/components/ui/Input';
import CustomText from '@/components/ui/Text';
import Row from '@/components/layout/Row';

import Categories from '../Overview/Categories';
import {FLIGHT_CATEGORY} from '@/types/common';
import Button from '@/components/ui/Button';
import {useUserStore} from '@/stores/userStore';

export default function FlightAdd() {
  const nav = useNavigation<UseNavigationProp>();
  const [passengers, setPassengers] = useState(1);
  const [category, setCategory] = useState(FLIGHT_CATEGORY.ECONOMY);
  const [departureFrom, setDepartureFrom] = useState('');
  const [arrivalTo, setArrivalTo] = useState('');

  const setCurrentFlight = useUserStore(state => state.setCurrentFlight);

  const isDisabled = !departureFrom || !arrivalTo;

  const addPassenger = () => {
    setPassengers(prev => prev + 1);
  };

  const removePassenger = () => {
    if (passengers === 1) return;
    setPassengers(prev => prev - 1);
  };

  const handleNext = () => {
    setCurrentFlight({
      category,
      departureFrom,
      arrivalTo,
      passengers,
    });

    nav.navigate(Screens.FLIGHT_DATE);
  };

  return (
    <BackgroundWrapper>
      <Container>
        <BackButton onPress={() => nav.goBack()} />

        <Title title="Add flight" />

        <View style={{marginTop: 32, width: '100%', gap: 16}}>
          <View style={styles.item}>
            <Label title="The point of departure" />
            <Input
              placeholder="Text"
              value={departureFrom}
              onChangeText={setDepartureFrom}
            />
          </View>

          <View style={styles.item}>
            <Label title="Point of arrival" />
            <Input
              placeholder="Text"
              value={arrivalTo}
              onChangeText={setArrivalTo}
            />
          </View>

          <Row justify="space-between" style={{width: '100%'}}>
            <CustomText>Passengers</CustomText>

            <Row
              gap={10}
              style={{
                paddingHorizontal: 16,
                // paddingVertical: 10,
                borderRadius: 40,
                backgroundColor: '#0B1948',
                height: 40,
                minWidth: 120,
                justifyContent: 'center',
              }}>
              <TouchableOpacity onPress={removePassenger}>
                <CustomText fs={32} color="#999">
                  -
                </CustomText>
              </TouchableOpacity>
              <View
                style={{
                  minWidth: 30,
                  alignItems: 'center',
                }}>
                <CustomText>{passengers}</CustomText>
              </View>

              <TouchableOpacity onPress={addPassenger}>
                <CustomText fs={24} color="#1DD063">
                  +
                </CustomText>
              </TouchableOpacity>
            </Row>
          </Row>

          <View style={styles.item}>
            <CustomText>Class</CustomText>
            <Categories
              excludeAll
              currentCategory={category}
              onChange={setCategory}
            />
          </View>
        </View>
      </Container>
      <Button
        disabled={isDisabled}
        style={{marginTop: 'auto', margin: 16}}
        title="Next"
        onPress={handleNext}
      />
    </BackgroundWrapper>
  );
}

const styles = StyleSheet.create({
  item: {width: '100%', gap: 8},
});
