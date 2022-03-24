import React from 'react';
import { View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Chat } from '../pages/Chat';
import { Room } from '../pages/Room';
import { Camera } from '../pages/Camera';
import { SignUp } from '../pages/SignUp';

import { useUser } from '../hooks/useUser';

const { Navigator, Screen } = createNativeStackNavigator();

export const StackRoutes = () => {
  const { role, loading } = useUser();

  if (loading) return <View />
  return (
  <Navigator screenOptions={{
    gestureEnabled: true
  }}>
    {
      !role &&
      <Screen name="signUp" component={SignUp} options={{
        headerTitle: 'Cadastro'
      }} />
    }
    <Screen name="rooms" component={Room} options={{
      headerTitle: 'Salas'
    }} />
    <Screen name="chat" component={Chat} />
    <Screen name="camera" component={Camera}  options={{
      presentation: 'modal',
      headerShown: false,
    }} />
  </Navigator>
);
}
