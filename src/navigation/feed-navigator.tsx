import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import type { Flights } from '@/api';
import { Feed, Filters, Home } from '@/screens';

export type FeedStackParamList = {
  Home: undefined;
  Feed: {
    flights: Flights[];
  };
  Filters: undefined;
};

const Stack = createNativeStackNavigator<FeedStackParamList>();

export const FeedNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Feed" component={Feed} />
      <Stack.Screen name="Filters" component={Filters} />
    </Stack.Navigator>
  );
};
