import type { RouteProp as NRouteProp } from '@react-navigation/native';

import type { FeedStackParamList } from './feed-navigator';

export type RootStackParamList = FeedStackParamList;
// very important to type check useNavigation hook
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RouteProp<T extends keyof RootStackParamList> = NRouteProp<
  RootStackParamList,
  T
>;
