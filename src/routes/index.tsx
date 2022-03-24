import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StackRoutes } from './stack.routes';
import { UserProvider } from '../hooks/useUser';


export const Routes = () => (
  <NavigationContainer>
    <UserProvider>
      <StackRoutes />
    </UserProvider>
  </NavigationContainer>
)