import { create } from 'zustand';

import type { Flights } from '@/api';

import { createSelectors } from '../utils';

interface FlightState {
  flights: Flights[];
  setFlights: (flights: Flights[]) => void;
}

const _useFlights = create<FlightState>((set, get) => ({
  flights: get()?.flights || [],
  setFlights: (flights) => set({ flights }),
}));

export const useFLights = createSelectors(_useFlights);
