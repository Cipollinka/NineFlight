import React, {useState} from 'react';
import BackgroundWrapper from '@/components/layout/Wrapper';
import Container from '@/components/layout/Container';
import {useNavigation} from '@react-navigation/native';
import {Screens, UseNavigationProp} from '@/types/navigation';
import BackButton from '@/components/BackButton';
import Title from '@/components/ui/Title';
import {View} from 'react-native';
import Label from '@/components/ui/Label';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import TextArea from '@/components/ui/TextArea';
import {useUserStore} from '@/stores/userStore';
import {FlightItem} from '@/types/common';

const regex = /^\d+(\.\d+)?$/;

function isNumber(input: string) {
  return regex.test(input);
}

export default function FlightInfo() {
  const nav = useNavigation<UseNavigationProp>();

  const currentFlight = useUserStore(state => state.currentFlight);

  const flights = useUserStore(state => state.flights);
  const addFlight = useUserStore(state => state.addFlight);

  const [cost, setCost] = useState('');
  const [comment, setComment] = useState('');

  const [costError, setCostError] = useState('');

  const isDisabled = !cost;

  const handleSave = () => {
    const id =
      flights?.[flights?.length - 1]?.id !== undefined
        ? flights[flights.length - 1].id + 1
        : 0;

    const flight = {
      ...currentFlight,
      cost: parseFloat(cost),
      comment,
      id,
    };

    addFlight(flight as FlightItem);
    nav.navigate(Screens.FLIGHT_SUCCESS);
  };

  const handleCostChange = (text: string) => {
    if (!text) {
      setCost(text);
      setCostError('');
      return;
    }
    if (isNumber(text)) {
      setCost(text);
      setCostError('');
    } else {
      setCostError('Cost must be a number');
    }
  };

  return (
    <BackgroundWrapper>
      <Container>
        <BackButton onPress={() => nav.goBack()} />
        <Title title="Add flight" />

        <View style={{marginTop: 32, width: '100%'}}>
          <Label title="Flight cost" />
          <Input
            placeholder="Text"
            value={cost}
            error={costError}
            onChangeText={handleCostChange}
          />
        </View>

        <View style={{marginTop: 16, width: '100%'}}>
          <Label title="Comment" />
          <TextArea
            value={comment}
            onChangeText={setComment}
            placeholder="Text"
          />
        </View>
      </Container>

      <Button
        disabled={isDisabled}
        style={{marginTop: 'auto', margin: 16}}
        title="Save"
        onPress={handleSave}
      />
    </BackgroundWrapper>
  );
}
