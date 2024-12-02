import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';

import FlightIcon from '@/assets/icons/flight.svg';
import StatisticIcon from '@/assets/icons/statistic.svg';
import TopicsIcon from '@/assets/icons/topics.svg';
import ProfileIcon from '@/assets/icons/profile.svg';
import PlusIcon from '@/assets/icons/plus.svg';

import {Screens, UseNavigationProp} from '@/types/navigation';

interface Props {
  onPress: () => void;
  Icon: any;
  selected?: boolean;
}

function NavigationItem({onPress, Icon, selected}: Props) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.navigationItem}>
        <View style={styles.item}>
          {<Icon color={selected ? '#1DD063' : '#999999'} />}
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function BottomNavigation() {
  const nav = useNavigation<UseNavigationProp>();
  const route = useRoute();

  const handleNavigate = (screen: Screens) => {
    nav.replace(screen as any);
  };

  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        zIndex: 40,
        paddingBottom: 10,
        paddingTop: 15,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
      }}>
      <Image
        source={require('@/assets/images/bottomContainer.png')}
        style={styles.curveContainer}
      />
      <View
        style={{
          position: 'absolute',
          top: 40,
          left: 0,
          bottom: 0,
          right: 0,
          backgroundColor: '#12266A',
        }}
      />
      <NavigationItem
        Icon={FlightIcon}
        onPress={() => handleNavigate(Screens.FLIGHT_OVERVIEW)}
        selected={route.name === Screens.FLIGHT_OVERVIEW}
      />
      <NavigationItem
        Icon={StatisticIcon}
        onPress={() => handleNavigate(Screens.STATISTIC)}
        selected={route.name === Screens.STATISTIC}
      />

      <TouchableOpacity
        style={{marginTop: '-14%'}}
        onPress={() => nav.navigate(Screens.FLIGHT_ADD)}>
        <View
          style={{
            width: 52,
            height: 52,
            borderRadius: 9999,
            backgroundColor: '#1DD063',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <PlusIcon />
        </View>
      </TouchableOpacity>

      <NavigationItem
        Icon={TopicsIcon}
        onPress={() => handleNavigate(Screens.BOOK_OVERVIEW)}
        selected={route.name === Screens.BOOK_OVERVIEW}
      />
      <NavigationItem
        Icon={ProfileIcon}
        onPress={() => handleNavigate(Screens.PROFILE_OVERVIEW)}
        selected={route.name === Screens.PROFILE_OVERVIEW}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  navigationItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  curveContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: 60,
  },
});
