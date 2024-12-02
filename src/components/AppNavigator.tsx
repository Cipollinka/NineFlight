import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList, Screens} from '@/types/navigation';

import FlightOverview from '@/screens/Flights/Overview';
import FlightAdd from '@/screens/Flights/Add';
import FlightDate from '@/screens/Flights/Add/FlightDate';
import FlightInfo from '@/screens/Flights/Add/FlightInfo';
import Success from '@/screens/Flights/Add/Success';
import BookOverview from '@/screens/Book/Overview';
import BookDetails from '@/screens/Book/Details';
import ProfileOverview from '@/screens/Profile/Overview';
import ProfileFeedback from '@/screens/Profile/Feedback';
import Statistic from '@/screens/Statistic';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={Screens.FLIGHT_OVERVIEW}
        screenOptions={{headerShown: false}}>
        <Stack.Screen
          name={Screens.FLIGHT_OVERVIEW}
          component={FlightOverview}
        />
        <Stack.Screen
          name={Screens.FLIGHT_ADD}
          component={FlightAdd}
          options={{
            gestureDirection: 'vertical',
          }}
        />
        <Stack.Screen name={Screens.FLIGHT_DATE} component={FlightDate} />
        <Stack.Screen name={Screens.FLIGHT_INFO} component={FlightInfo} />
        <Stack.Screen name={Screens.FLIGHT_SUCCESS} component={Success} />

        <Stack.Screen name={Screens.BOOK_OVERVIEW} component={BookOverview} />
        <Stack.Screen name={Screens.BOOK_DETAILS} component={BookDetails} />

        <Stack.Screen
          name={Screens.PROFILE_OVERVIEW}
          component={ProfileOverview}
        />
        <Stack.Screen
          name={Screens.PROFILE_FEEDBACK}
          component={ProfileFeedback}
        />

        <Stack.Screen name={Screens.STATISTIC} component={Statistic} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
