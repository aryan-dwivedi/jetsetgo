import { useNavigation } from '@react-navigation/native';
import React from 'react';

import { useFLights } from '@/core/hooks/use-flights';
import { Button, Input, SafeAreaView, Select, Text, View } from '@/ui';

export const Filters = () => {
  const { flights } = useFLights();
  const { navigate } = useNavigation();

  const [selectedAirline, setSelectedAirline] = React.useState('');
  const [minPrice, setMinPrice] = React.useState('');
  const [maxPrice, setMaxPrice] = React.useState('');

  const airlineOptions = flights
    .map((flight) => flight.airline)
    .filter((airline, index, self) => self.indexOf(airline) === index)
    .map((airline) => ({ label: airline, value: airline }));

  const applyFilters = () => {
    const filteredFlights = flights.filter(
      (flight) =>
        (selectedAirline ? flight.airline === selectedAirline : true) &&
        (minPrice === '' || flight.price >= parseInt(minPrice, 10)) &&
        (maxPrice === '' || flight.price <= parseInt(maxPrice, 10))
    );

    console.log('filteredFlights', filteredFlights);

    navigate('Feed', {
      flights: filteredFlights,
    });
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="px-4">
        <Text variant="h1">Filters</Text>
        <View className="py-4">
          <Text className="text-gray-600">Airlines</Text>
          <Select
            options={airlineOptions}
            value={selectedAirline}
            onSelect={(value) => setSelectedAirline(value as string)}
            placeholder="Select Airline"
          />
        </View>
        <View className="py-4">
          <Text className="text-gray-600">Price Range</Text>
          <View className="flex flex-row gap-4">
            <View className="flex-1">
              <Input
                placeholder="Min"
                value={minPrice}
                onChangeText={(text) => setMinPrice(text)}
                keyboardType="numeric"
              />
            </View>
            <View className="flex-1">
              <Input
                placeholder="Max"
                value={maxPrice}
                onChangeText={(text) => setMaxPrice(text)}
                keyboardType="numeric"
              />
            </View>
          </View>
        </View>
        <Button label="Apply Filters" onPress={applyFilters} />
      </View>
    </SafeAreaView>
  );
};
