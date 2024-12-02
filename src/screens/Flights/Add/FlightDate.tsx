import React, {useState} from 'react';
import BackgroundWrapper from '@/components/layout/Wrapper';
import Container from '@/components/layout/Container';
import CustomText from '@/components/ui/Text';
import DatePicker from 'react-native-date-picker';
import BackButton from '@/components/BackButton';
import {Screens, UseNavigationProp} from '@/types/navigation';
import {useNavigation} from '@react-navigation/native';
import Title from '@/components/ui/Title';
import Label from '@/components/ui/Label';
import {TouchableOpacity, View} from 'react-native';
import Row from '@/components/layout/Row';
import CalendarIcon from '@/assets/icons/calendar.svg';
import TimeIcon from '@/assets/icons/time.svg';
import CrossIcon from '@/assets/icons/cross.svg';
import Button from '@/components/ui/Button';
import {useUserStore} from '@/stores/userStore';

export default function FlightDate({route}: any) {
  const isArrival = route?.params?.isArrival;
  const nav = useNavigation<UseNavigationProp>();

  const currentFlight = useUserStore(state => state.currentFlight);
  const setCurrentFlight = useUserStore(state => state.setCurrentFlight);

  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);

  const [isDateRemoved, setIsDateRemoved] = useState(false);
  const [isTimeRemoved, setIsTimeRemoved] = useState(false);

  const isDisabled =
    isDateRemoved || isTimeRemoved || isDatePickerOpen || isTimePickerOpen;

  const handleNext = () => {
    if (isDisabled) {
      return;
    }
    const key = isArrival ? 'arrival' : 'departure';

    setCurrentFlight({
      ...currentFlight,
      [key]: {
        date: date.toISOString(),
        time: time.toISOString(),
      },
    });

    if (!isArrival) {
      nav.navigate({
        name: Screens.FLIGHT_DATE,
        key: `FLIGHT_DATE_${new Date().getTime()}`,
        params: {isArrival: true},
      });
    } else {
      nav.navigate({
        name: Screens.FLIGHT_INFO,
        key: `FLIGHT_INFO_${new Date().getTime()}`,
      });
    }
  };

  return (
    <BackgroundWrapper>
      <Container>
        <BackButton onPress={() => nav.goBack()} />
        <Title title="Add flight" />

        <View style={{marginTop: 32}}>
          <Label title={isArrival ? 'Date of arrival' : 'Date of departure'} />
          <TouchableOpacity onPress={() => setIsDatePickerOpen(true)}>
            <Row
              justify="space-between"
              style={{
                width: '100%',
                backgroundColor: '#0B1948',
                paddingHorizontal: 12,
                paddingVertical: 16,
                borderRadius: 10,
              }}>
              <Row gap={10}>
                <CalendarIcon width={20} height={20} color="#1DD063" />
                {!isDateRemoved && (
                  <CustomText>{date.toLocaleDateString()}</CustomText>
                )}
                {isDateRemoved && (
                  <CustomText color="#B7B7B7">DD.MM.YY</CustomText>
                )}
              </Row>

              <TouchableOpacity onPress={() => setIsDateRemoved(true)}>
                <CrossIcon />
              </TouchableOpacity>
            </Row>
          </TouchableOpacity>
        </View>

        <View style={{marginTop: 16}}>
          <Label title={isArrival ? 'Time of arrival' : 'Time of departure'} />
          <TouchableOpacity onPress={() => setIsTimePickerOpen(true)}>
            <Row
              justify="space-between"
              style={{
                width: '100%',
                backgroundColor: '#0B1948',
                paddingHorizontal: 12,
                paddingVertical: 16,
                borderRadius: 10,
              }}>
              <Row gap={10}>
                <TimeIcon width={20} height={20} color="#1DD063" />
                {!isTimeRemoved && (
                  <CustomText>
                    {time.toLocaleTimeString().slice(0, 5)}
                  </CustomText>
                )}
                {isTimeRemoved && (
                  <CustomText color="#B7B7B7">00:00</CustomText>
                )}
              </Row>

              <TouchableOpacity onPress={() => setIsTimeRemoved(true)}>
                <CrossIcon />
              </TouchableOpacity>
            </Row>
          </TouchableOpacity>
        </View>

        <DatePicker
          modal
          open={isDatePickerOpen}
          date={date}
          mode="date"
          onConfirm={selectedDate => {
            setIsDatePickerOpen(false);
            setIsDateRemoved(false);
            setDate(selectedDate);
          }}
          onCancel={() => setIsDatePickerOpen(false)}
          minimumDate={new Date()}
        />

        <DatePicker
          modal
          open={isTimePickerOpen}
          date={time}
          mode="time"
          onConfirm={selectedDate => {
            setIsTimePickerOpen(false);
            setIsTimeRemoved(false);
            setTime(selectedDate);
          }}
          onCancel={() => setIsTimePickerOpen(false)}
        />
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
