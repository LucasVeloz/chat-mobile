import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Chat } from '../pages/Chat';
import { Room } from '../pages/Room';
import { Camera } from '../pages/Camera';

const { Navigator, Screen } = createNativeStackNavigator();

export const StackRoutes = () => (
  <Navigator screenOptions={{
    gestureEnabled: true
  }}>
    <Screen name="rooms" component={Room} options={{
      headerTitle: 'Salas'
    }} />
    <Screen name="chat" component={Chat} />
    <Screen name="camera" component={Camera}  options={{
      presentation: 'modal',
      headerShown: false,
    }} />
  </Navigator>
)
