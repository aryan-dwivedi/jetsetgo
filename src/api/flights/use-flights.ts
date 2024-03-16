import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { client } from '../common';
import type { Flights } from './types';

type Response = Flights[];
type Variables = void;

export const useFlights = createQuery<Response, Variables, AxiosError>({
  primaryKey: '378e02e8e732bb1ac55b',
  queryFn: ({ queryKey: [primaryKey] }) => {
    return client.get(`${primaryKey}`).then((response) => response.data);
  },
});
