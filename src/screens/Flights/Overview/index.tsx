import React from 'react';
import BackgroundWrapper from '@/components/layout/Wrapper';
import Container from '@/components/layout/Container';
import Title from '@/components/ui/Title';
import Categories from './Categories';
import {FLIGHT_CATEGORY} from '@/types/common';
import Item from './Item';
import {ScrollView, View} from 'react-native';
import BottomNavigation from '@/components/BottomNavigation';
import EmptyScreen from './EmptyScreen';
import {useUserStore} from '@/stores/userStore';

export default function FlightOverview() {
  const [currentCategory, setCurrentCategory] = React.useState(
    FLIGHT_CATEGORY.ALL,
  );
  const flights = useUserStore(state => state.flights);

  const accessor =
    currentCategory === FLIGHT_CATEGORY.ALL
      ? flights
      : flights.filter(flight => flight.category === currentCategory);
  const isEmpty = accessor.length === 0;

  return (
    <BackgroundWrapper>
      <Container style={{paddingBottom: 0}}>
        <Title title="My flights" />
        <View style={{marginTop: 16}}>
          <Categories
            currentCategory={currentCategory}
            onChange={setCurrentCategory}
          />
        </View>

        {isEmpty && <EmptyScreen />}

        {!isEmpty && (
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{width: '100%', marginTop: 10}}>
            <View style={{marginTop: 22}} />
            {accessor.map(flight => (
              <Item flight={flight} key={flight.id} />
            ))}

            <View style={{marginBottom: 100}} />
          </ScrollView>
        )}
      </Container>

      <BottomNavigation />
    </BackgroundWrapper>
  );
}
