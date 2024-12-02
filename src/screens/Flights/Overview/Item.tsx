import {View, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Row from '@/components/layout/Row';
import CustomText from '@/components/ui/Text';
import ArrowIcon from '@/assets/icons/arrow.svg';
import Collapsible from 'react-native-collapsible';
import {FLIGHT_CATEGORY, FlightItem} from '@/types/common';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

interface Props {
  flight: FlightItem;
}

const categoriesLabels = {
  [FLIGHT_CATEGORY.ECONOMY]: 'Economy',
  [FLIGHT_CATEGORY.BUSINESS]: 'Business',
  [FLIGHT_CATEGORY.STANDARD]: 'Standard',
};

function calculateDateDifference(
  departure: FlightItem['departure'],
  arrival: FlightItem['arrival'],
): string {
  const combinedDeparture = combineISODateAndTime(
    departure.date,
    departure.time,
  );

  const combinedArrival = combineISODateAndTime(arrival.date, arrival.time);

  const start = dayjs(combinedDeparture);
  const end = dayjs(combinedArrival);

  const diffMilliseconds = end.diff(start);
  const diffDuration = dayjs.duration(diffMilliseconds);

  const days = Math.floor(diffDuration.asDays());
  const hours = diffDuration.hours();
  const minutes = diffDuration.minutes();

  let result = '';

  if (days > 0) {
    result += `${days}d `;
  }
  if (hours > 0 || days > 0) {
    result += `${hours}h `;
  }
  if (minutes > 0 || (!days && !hours)) {
    result += `${minutes}m`;
  }

  return result.trim();
}

function combineISODateAndTime(dateISO: string, timeISO: string): string {
  const datePart = dayjs(dateISO).format('YYYY-MM-DD');
  const timePart = dayjs(timeISO).format('HH:mm:ss');
  const combined = `${datePart}T${timePart}`;
  return dayjs(combined).toISOString();
}

export default function Item({flight}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const startDate = combineISODateAndTime(
    flight?.departure?.date,
    flight?.departure?.time,
  );

  return (
    <View style={styles.container}>
      <Row justify="space-between">
        <CustomText>{dayjs(startDate).format('DD, MMMM HH:mm')}</CustomText>
        <View
          style={{
            backgroundColor: '#1DD063',
            borderRadius: 9999,
            paddingHorizontal: 10,
            paddingVertical: 5,
          }}>
          <CustomText fw="semibold">
            {/* @ts-ignore */}
            {categoriesLabels[flight?.category]}
          </CustomText>
        </View>
      </Row>

      <View style={{marginTop: 12}}>
        <Row gap={9}>
          <View style={[styles.keyPoint, {backgroundColor: '#1DD063'}]}>
            <CustomText fw="bold" fs={8}>
              A
            </CustomText>
          </View>
          <CustomText fs={14}>{flight?.departureFrom}</CustomText>
        </Row>

        <Row mt={20} justify="space-between">
          <Row gap={9}>
            <View style={[styles.keyPoint, {backgroundColor: '#12266A'}]}>
              <CustomText fw="bold" fs={8}>
                B
              </CustomText>
            </View>
            <CustomText fs={14}>{flight?.arrivalTo}</CustomText>
          </Row>

          <CustomText fw="bold" fs={20} color="#1DD063">
            {flight?.cost}$
          </CustomText>
        </Row>
      </View>

      <View style={{marginTop: 16}}>
        <TouchableOpacity onPress={() => setIsOpen(prev => !prev)}>
          <Row justify="space-between">
            <CustomText fw="bold" fs={14}>
              Additional information
            </CustomText>

            <ArrowIcon
              color="white"
              style={{transform: [{rotate: isOpen ? '180deg' : '0deg'}]}}
            />
          </Row>
        </TouchableOpacity>

        <Collapsible collapsed={!isOpen}>
          <View style={{gap: 12, marginTop: 12}}>
            <Row justify="space-between">
              <CustomText fw="bold" fs={14}>
                On the way
              </CustomText>
              <CustomText fs={14}>
                {calculateDateDifference(flight?.departure, flight?.arrival)}
              </CustomText>
            </Row>

            <Row justify="space-between">
              <CustomText fw="bold" fs={14}>
                Passengers
              </CustomText>
              <CustomText fs={14}>{flight?.passengers}</CustomText>
            </Row>

            <View style={{gap: 4}}>
              <CustomText fw="bold" fs={14}>
                Comment
              </CustomText>
              <CustomText fs={14}>{flight?.comment}</CustomText>
            </View>
          </View>
        </Collapsible>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    backgroundColor: '#0B1948',
    padding: 16,
    width: '100%',
    marginBottom: 20,
  },
  keyPoint: {
    borderRadius: 9999,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    height: 20,
    width: 20,
  },
});
