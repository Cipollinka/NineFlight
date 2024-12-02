export enum FLIGHT_CATEGORY {
  ALL,
  ECONOMY,
  STANDARD,
  BUSINESS,
}

export enum STATISTIC_CATEGORY {
  WEEK,
  MONTH,
  YEAR,
  ALL,
}

export interface FlightItem {
  id: number;
  departureFrom: string;
  arrivalTo: string;
  departure: {
    date: string;
    time: string;
  };
  arrival: {
    date: string;
    time: string;
  };
  passengers: number;
  category: Omit<FLIGHT_CATEGORY, FLIGHT_CATEGORY.ALL>;
  cost: number;
  comment: string;
}

export interface Book {
  id: number;
  title: string;
  text: string;
  image: string;
}
