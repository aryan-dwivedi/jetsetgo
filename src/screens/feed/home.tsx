import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';

import { useFlights } from '@/api';
import { useFLights as useFlightsData } from '@/core/hooks/use-flights';
import { Button, FocusAwareStatusBar, Select, Text, View } from '@/ui';

export const Home = () => {
  const { data } = useFlights();
  const { navigate } = useNavigation();
  const { flights, setFlights } = useFlightsData();

  const [origin, setOrigin] = useState<string>();
  const [destination, setDestination] = useState<string>();

  const from_options = useCallback(() => {
    if (data) {
      const origins = [...new Set(data.map((flight) => flight.origin))];
      return origins.map((_origin) => ({ label: _origin, value: _origin }));
    }
    return [];
  }, [data]);

  const to_options = useCallback(() => {
    if (data && origin) {
      const destinations = [
        ...new Set(
          data
            .filter((flight) => flight.origin === origin)
            .map((flight) => flight.destination)
        ),
      ];
      return destinations.map((_destination) => ({
        label: _destination,
        value: _destination,
      }));
    }
    return [];
  }, [data, origin]);

  useEffect(() => {
    if (origin && destination) {
      setFlights(
        data?.filter(
          (flight) =>
            flight.origin === origin && flight.destination === destination
        ) || []
      );
    }
  }, [origin, destination, data, setFlights]);

  return (
    <View className="flex-1 items-center justify-center bg-neutral-100">
      <FocusAwareStatusBar />

      <View className="absolute top-0 h-60 w-full rounded-b-[50px] bg-blue-700">
        <Text variant="h1" className="w-48 px-4 pt-10 font-bold text-white">
          Book your next flight
        </Text>
      </View>

      <View className="mt-20 w-5/6 rounded-2xl bg-white py-12 px-4 shadow-2xl">
        <Text>From</Text>
        <Select
          options={from_options()}
          value={origin}
          onSelect={(value) => setOrigin(value as string)}
        />

        <Text>To</Text>
        <Select
          options={to_options()}
          value={destination}
          onSelect={(value) => setDestination(value as string)}
        />
        <View className="mt-8">
          <Button
            label="Search Flights"
            onPress={() =>
              navigate('Feed', {
                flights,
              })
            }
          />
        </View>
      </View>
    </View>
  );
};
