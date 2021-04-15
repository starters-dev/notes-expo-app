import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { useServices } from '../../services';

import AuthNavigator from '../auth';
import NotesScreen from './notes';
import NoteDetailsScreen from './noteDetails';

const LandingNavigator: React.FC<NavigatorProps> = ({
}) => {
  const { t } = useServices();

  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={'Notes'}
        component={NotesScreen}
        options={{
          title: t.do('notes.title'),
        }}
      />
      <Stack.Screen
        name={'NoteDetailsScreen'}
        component={NoteDetailsScreen}
        options={{
          title: '',
        }}
      />
      <Stack.Screen
        name={'Auth'}
        component={AuthNavigator}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  )
};

export default LandingNavigator;