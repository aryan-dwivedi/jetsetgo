import { useNavigation, useRoute } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import React from 'react';

import type { Flights } from '@/api';
import type { RouteProp } from '@/navigation/types';
import {
  EmptyList,
  FocusAwareStatusBar,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from '@/ui';

import { Card } from './card';

export const Feed = () => {
  const {
    params: { flights },
  } = useRoute<RouteProp<'Feed'>>();

  const { navigate } = useNavigation();

  const renderItem = React.useCallback(
    ({ item }: { item: Flights }) => <Card {...item} />,
    []
  );

  const listHeader = React.useCallback(
    () => (
      <View className="flex-row items-center justify-between px-4">
        <Text variant="h1" className="font-semibold">
          Flights
        </Text>
        <TouchableOpacity onPress={() => navigate('Filters')}>
          <Text className="text-blue-500">Filters</Text>
        </TouchableOpacity>
      </View>
    ),
    [navigate]
  );

  return (
    <SafeAreaView className="flex-1">
      <FocusAwareStatusBar />
      <FlashList
        data={flights}
        renderItem={renderItem}
        keyExtractor={(_, index) => `item-${index}`}
        ListEmptyComponent={<EmptyList isLoading={false} />}
        ListHeaderComponent={listHeader}
        estimatedItemSize={20}
      />
    </SafeAreaView>
  );
};
