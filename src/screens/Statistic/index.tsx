import React from 'react';
import BackgroundWrapper from '@/components/layout/Wrapper';
import Container from '@/components/layout/Container';
import Title from '@/components/ui/Title';
import Chart from './Chart';
import {useUserStore} from '@/stores/userStore';
import {ScrollView, View} from 'react-native';
import {FLIGHT_CATEGORY, FlightItem} from '@/types/common';
import BottomNavigation from '@/components/BottomNavigation';
import EmptyScreen from './EmptyScreen';

export default function Statistic() {
  const flights = useUserStore(state => state.flights);

  const {economy, standard, business} = flights.reduce(
    (acc, flight) => {
      if (flight.category === FLIGHT_CATEGORY.ECONOMY) {
        acc.economy.push(flight);
      } else if (flight.category === FLIGHT_CATEGORY.STANDARD) {
        acc.standard.push(flight);
      } else if (flight.category === FLIGHT_CATEGORY.BUSINESS) {
        acc.business.push(flight);
      }

      return acc;
    },
    {
      economy: [] as FlightItem[],
      standard: [] as FlightItem[],
      business: [] as FlightItem[],
    },
  );

  return (
    <BackgroundWrapper>
      <Container>
        <Title title="Stats" />
        <ScrollView showsVerticalScrollIndicator={false}>
          {flights.length === 0 && <EmptyScreen />}
          {flights.length > 0 && (
            <Chart title="All flights" flights={flights} />
          )}
          {economy.length > 0 && <Chart title="Econom" flights={economy} />}
          {standard.length > 0 && <Chart title="Standard" flights={standard} />}
          {business.length > 0 && <Chart title="Business" flights={business} />}

          <View style={{marginBottom: 100}} />
        </ScrollView>
      </Container>

      <BottomNavigation />
    </BackgroundWrapper>
  );
}
