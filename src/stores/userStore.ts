import {FlightItem} from '@/types/common';
import {getPersistStoreOptions} from '@/utils/getPersistStoreOptions';
import {create} from 'zustand';
import {persist} from 'zustand/middleware';

interface State {
  currentFlight: Partial<FlightItem>;
  setCurrentFlight: (flight: Partial<FlightItem>) => void;

  flights: FlightItem[];
  addFlight: (flight: FlightItem) => void;
  removeFlight: (id: number) => void;
  setFlights: (flights: FlightItem[]) => void;

  favoriteBooks: number[];
  addFavoriteBook: (id: number) => void;
  removeFavoriteBook: (id: number) => void;

  username: string;
  setUsername: (username: string) => void;

  avatar: string;
  setAvatar: (avatar: string) => void;
}

export const useUserStore = create(
  persist<State>(
    set => ({
      currentFlight: {},
      setCurrentFlight: (flight: Partial<FlightItem>) =>
        set(state => ({...state, currentFlight: flight})),

      flights: [],
      addFlight: (flight: FlightItem) =>
        set(state => ({...state, flights: [...state.flights, flight]})),
      removeFlight: (id: number) =>
        set(state => ({
          ...state,
          flights: state.flights.filter(f => f.id !== id),
        })),
      setFlights: (flights: FlightItem[]) =>
        set(state => ({...state, flights})),

      favoriteBooks: [],
      addFavoriteBook: (id: number) =>
        set(state => ({...state, favoriteBooks: [...state.favoriteBooks, id]})),
      removeFavoriteBook: (id: number) =>
        set(state => ({
          ...state,
          favoriteBooks: state.favoriteBooks.filter(f => f !== id),
        })),

      username: '',
      setUsername: (username: string) => set(state => ({...state, username})),

      avatar: '',
      setAvatar: (avatar: string) => set(state => ({...state, avatar})),
    }),

    getPersistStoreOptions('user'),
  ),
);
