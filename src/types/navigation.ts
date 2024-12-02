import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Book} from './common';

export enum Screens {
  FLIGHT_OVERVIEW = 'flightOverview',
  FLIGHT_ADD = 'flightAdd',
  FLIGHT_DATE = 'flightDate',
  FLIGHT_INFO = 'flightInfo',
  FLIGHT_SUCCESS = 'flightSuccess',

  STATISTIC = 'statistic',

  BOOK_OVERVIEW = 'topics',
  BOOK_DETAILS = 'details',

  PROFILE_OVERVIEW = 'profile',
  PROFILE_FEEDBACK = 'profileFeedback',
}

export type RootStackParamList = {
  [Screens.FLIGHT_OVERVIEW]: undefined;
  [Screens.FLIGHT_ADD]: undefined;
  [Screens.FLIGHT_DATE]: {isArrival: boolean} | undefined;
  [Screens.FLIGHT_INFO]: undefined;
  [Screens.FLIGHT_SUCCESS]: undefined;

  [Screens.STATISTIC]: undefined;

  [Screens.BOOK_OVERVIEW]: undefined;
  [Screens.BOOK_DETAILS]: {book: Book};

  [Screens.PROFILE_OVERVIEW]: undefined;
  [Screens.PROFILE_FEEDBACK]: undefined;
};

export type ScreenNavigationProp<T extends keyof RootStackParamList> = {
  navigation: NativeStackNavigationProp<RootStackParamList, T>;
};

export type UseNavigationProp = NativeStackNavigationProp<RootStackParamList>;
