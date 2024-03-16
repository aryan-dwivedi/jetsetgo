import React, { useCallback } from 'react';

import type { Flights } from '@/api';
import { Image, Pressable, Text, View } from '@/ui';

type Props = Flights;

export const Card = ({
  origin,
  airline,
  destination,
  arrivalTime,
  departureTime,
  flightNumber,
  duration,
  price,
}: Props) => {
  const formatTime = useCallback((time: string) => {
    const date = new Date(time);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
    });
  }, []);

  const formattedHours = useCallback(() => {
    const [hours, , minutes] = duration.split(' ');

    if (hours && minutes) {
      return `${hours}H ${minutes}M`;
    } else if (hours) {
      return `${hours}H`;
    }

    return `${minutes}M`;
  }, [duration]);

  const renderFlightImage = useCallback(() => {
    switch (airline) {
      case 'IndiGo':
        return (
          <Image
            source={{
              uri: 'https://imgak.mmtcdn.com/flights/assets/media/dt/common/icons/6E.png',
            }}
            className="h-8 w-8"
          />
        );
      case 'Air India':
        return (
          <Image
            source={{
              uri: 'https://imgak.mmtcdn.com/flights/assets/media/dt/common/icons/AI.png',
            }}
            className="h-8 w-8"
          />
        );
      case 'SpiceJet':
        return (
          <Image
            source={{
              uri: 'https://imgak.mmtcdn.com/flights/assets/media/dt/common/icons/SG.png',
            }}
            className="h-8 w-8"
          />
        );
      case 'GoAir':
        return (
          <Image
            source={{
              uri: 'https://imgak.mmtcdn.com/flights/assets/media/dt/common/icons/G8.png',
            }}
            className="h-8 w-8"
          />
        );
      case 'AirAsia':
        return (
          <Image
            source={{
              uri: 'https://imgak.mmtcdn.com/flights/assets/media/dt/common/icons/FD.png',
            }}
            className="h-8 w-8"
          />
        );
      case 'Vistara':
        return (
          <Image
            source={{
              uri: 'https://imgak.mmtcdn.com/flights/assets/media/dt/common/icons/UK.png',
            }}
            className="h-8 w-8"
          />
        );
      default:
        return <></>;
    }
  }, [airline]);

  return (
    <Pressable className="m-2 block overflow-hidden rounded-xl bg-neutral-100 p-2 shadow-xl">
      <View className="flex-row items-center justify-between">
        <View className="flex-col items-center">
          <Text variant="h2">{formatTime(departureTime)}</Text>
          <Text className="text-neutral-400">{origin}</Text>
        </View>
        <View className="flex-col items-center">
          <Text>{flightNumber}</Text>
          <Text>{formattedHours()}</Text>
        </View>
        <View className="flex-col items-center">
          <Text variant="h2">{formatTime(arrivalTime)}</Text>
          <Text className="text-neutral-400">{destination}</Text>
        </View>
      </View>

      <View className="mt-4 flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
          {renderFlightImage()}
          <Text className="font-semibold">{airline}</Text>
        </View>
        <Text variant="h3">₹{price}</Text>
      </View>
    </Pressable>
  );
};
