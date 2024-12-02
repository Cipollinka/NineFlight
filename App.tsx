import React from 'react';
import AppNavigator from './src/components/AppNavigator';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import {SafeAreaProvider} from 'react-native-safe-area-context';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <AppNavigator />
    </SafeAreaProvider>
  );
}
AppRegistry.registerComponent(appName, () => App);

export default App;
