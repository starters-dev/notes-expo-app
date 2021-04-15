import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

import { useServices } from '../../services';
import { navBarStyle } from '../../utils/help';

import LoginScreen from './login';

const AuthNavigator: React.FC<NavigatorProps> = ({
}) => {
  const { t } = useServices();

  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={navBarStyle()}>
      <Stack.Screen
        name={'LoginScreen'}
        component={LoginScreen}
        options={{
          title: t.do('login.title'),
        }}
      />
    </Stack.Navigator>
  )
};

export default AuthNavigator;