import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { useServices } from '../../services';

import LoginScreen from './login';

const AuthNavigator: React.FC<NavigatorProps> = ({
}) => {
  const { t } = useServices();

  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
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