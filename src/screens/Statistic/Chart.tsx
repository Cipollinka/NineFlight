import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import CategorySelect from './CategorySelect';
import {FlightItem, STATISTIC_CATEGORY} from '@/types/common';
import CustomText from '@/components/ui/Text';
import Row from '@/components/layout/Row';
import {BarChart, XAxis, YAxis} from 'react-native-svg-charts';

import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(isoWeek);
dayjs.extend(weekOfYear);
dayjs.extend(isBetween);

interface Props {
  title: string;
  flights: FlightItem[];
  // data: number[];
}

export function groupFlightsByCategory(
  flights: FlightItem[],
  category: STATISTIC_CATEGORY,
) {
  console.log('flights', flights);

  const now = dayjs();
  const groupedData: number[] = [];

  switch (category) {
    case STATISTIC_CATEGORY.WEEK:
      // Group by the current week (7 days)
      const startOfWeek = now.startOf('week');

      for (let i = 0; i < 7; i++) {
        const day = startOfWeek.add(i, 'day').format('YYYY-MM-DD');
        const totalCost = flights
          .filter(
            flight => dayjs(flight.departure.date).format('YYYY-MM-DD') === day,
          )
          .reduce((sum, flight) => sum + flight.cost, 0);
        groupedData.push(totalCost);
      }
      break;

    case STATISTIC_CATEGORY.MONTH:
      // Group by month (4 weeks)
      const startOfMonth = now.startOf('month');
      for (let i = 0; i < 4; i++) {
        const startOfWeekInMonth = startOfMonth.add(i * 7, 'days');
        const endOfWeekInMonth = startOfWeekInMonth.add(7, 'days');
        console.log(
          'startOfWeekInMonth',
          startOfWeekInMonth.format('YYYY-MM-DD'),
        );
        console.log('endOfWeekInMonth', endOfWeekInMonth.format('YYYY-MM-DD'));

        const totalCost = flights
          .filter(flight =>
            dayjs(flight.departure.date).isBetween(
              startOfWeekInMonth,
              endOfWeekInMonth,
              null,
              '[]',
            ),
          )
          .reduce((sum, flight) => sum + flight.cost, 0);

        groupedData.push(totalCost);
      }
      break;

    case STATISTIC_CATEGORY.YEAR:
      // Group by year (quarters)
      const startOfYear = now.startOf('year');
      for (let i = 0; i < 4; i++) {
        const startOfQuarter = startOfYear.add(i * 3, 'months');
        const endOfQuarter = startOfQuarter.add(2, 'months').endOf('month');
        console.log('startOfQuarter', startOfQuarter.format('YYYY-MM-DD'));
        console.log('endOfQuarter', endOfQuarter.format('YYYY-MM-DD'));

        const totalCost = flights
          .filter(flight =>
            dayjs(flight.departure.date).isBetween(
              startOfQuarter,
              endOfQuarter,
              null,
              '[]',
            ),
          )
          .reduce((sum, flight) => sum + flight.cost, 0);

        groupedData.push(totalCost);
      }
      break;

    case STATISTIC_CATEGORY.ALL:
      // Group by all years
      const years = Array.from(
        new Set(flights.map(flight => dayjs(flight.departure.date).year())),
      ).sort();
      years.forEach(year => {
        const totalCost = flights
          .filter(flight => dayjs(flight.departure.date).year() === year)
          .reduce((sum, flight) => sum + flight.cost, 0);
        groupedData.push(totalCost);
      });
      break;

    default:
      return groupedData;
  }

  return groupedData;
}

// Function to generate chart labels based on STATISTIC_CATEGORY
const getChartLabels = (category: STATISTIC_CATEGORY): string[] => {
  const now = dayjs();

  switch (category) {
    case STATISTIC_CATEGORY.WEEK: {
      const startOfWeek = now.startOf('isoWeek');
      const labels: string[] = [];

      for (let i = 0; i < 7; i++) {
        const currentDate = startOfWeek.add(i, 'day');
        const day = currentDate.format('ddd'); // Thu, Fri, etc.
        const date = currentDate.format('D'); // 28, 29, etc.
        labels.push(`${date}, ${day}`);
      }

      return labels;
    }

    case STATISTIC_CATEGORY.MONTH: {
      return ['1 week', '2 week', '3 week', '4 week'];
    }

    case STATISTIC_CATEGORY.YEAR: {
      return ['Jan-Mar', 'Apr-Jun', 'Jul-Sep', 'Oct-Dec'];
    }

    case STATISTIC_CATEGORY.ALL: {
      const currentYear = now.year();
      const years = Array.from(
        {length: 1},
        (_, i) => currentYear - i,
      ).reverse(); // Last 5 years
      return years.map(String); // Convert years to strings
    }

    default:
      throw new Error('Invalid statistic category');
  }
};

export default function Chart({title, flights}: Props) {
  const [currentTab, setCurrentTab] = useState<STATISTIC_CATEGORY>(
    STATISTIC_CATEGORY.WEEK,
  );

  const totalCost = flights.reduce((acc, flight) => acc + flight.cost, 0);
  const data = groupFlightsByCategory(flights, currentTab);
  console.log('data', data);

  const labels = getChartLabels(currentTab);

  return (
    <View style={{gap: 12, marginTop: 32}}>
      <CustomText fw="semibold" fs={20}>
        {title}
      </CustomText>
      <CategorySelect onChangeTab={setCurrentTab} currentTab={currentTab} />

      <View style={{borderRadius: 20, backgroundColor: '#0B1948'}}>
        <Row
          style={{width: '100%', justifyContent: 'space-between', padding: 16}}>
          <CustomText fs={16}>Total cost</CustomText>

          <CustomText fw="bold" fs={20} color="#1DD063">
            {totalCost}$
          </CustomText>
        </Row>

        <View>
          <View style={styles.container}>
            <View
              style={{
                flexDirection: 'row',
                height: 100,
                paddingHorizontal: 16,
              }}>
              <YAxis
                data={data}
                // yAccessor={({item}) => item.}
                contentInset={{bottom: 5, top: 10}}
                svg={{
                  fill: '#999999',
                  fontSize: 10,
                }}
                min={0}
                numberOfTicks={5}
              />

              <BarChart
                style={{flex: 1}}
                data={data}
                svg={{fill: '#19BA58'}}
                contentInset={{top: 0, bottom: 0, left: 10}}
                yMin={0}
                spacingInner={0.15}
                // yAccessor={({item}) => item.value}
              />
            </View>
            <XAxis
              style={{marginTop: 10}}
              data={data}
              formatLabel={(value, index) => labels[index]}
              contentInset={{left: 65, right: 40}}
              svg={{
                fontSize: 10,
                fill: '#999999',
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    marginBottom: 10,
  },
  chart: {
    width: '100%',
  },
});
