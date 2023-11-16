import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ResetScreen from './screens/ResetScreen';
import BillScreen from './screens/BillScreen';
const Stack = createNativeStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Reset" component={ResetScreen} />
        <Stack.Screen name="Bill" component={BillScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
