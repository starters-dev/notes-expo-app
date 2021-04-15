import React from 'react';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

import { navBarStyle } from '../../utils/help';
import { useServices } from '../../services';

import AuthNavigator from '../auth';
import NotesScreen from './notes';
import NoteDetailsScreen from './noteDetails';

const LandingNavigator: React.FC<NavigatorProps> = ({
}) => {
  const { t } = useServices();

  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={navBarStyle()}>
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
          headerLargeTitle: false,
        }}
      />
      <Stack.Screen
        name={'Auth'}
        component={AuthNavigator}
        options={{
          stackPresentation: 'modal',
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  )
};

export default LandingNavigator;