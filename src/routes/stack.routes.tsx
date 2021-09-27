import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Chat } from '../pages/Chat';
import { Room } from '../pages/Room';

const { Navigator, Screen } = createNativeStackNavigator();

export const StackRoutes = () => (
  <Navigator>
    <Screen name="rooms" component={Room} />
    <Screen name="chat" component={Chat} />
  </Navigator>
)
