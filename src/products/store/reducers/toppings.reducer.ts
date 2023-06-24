import { createReducer, on } from '@ngrx/store';
import * as fromToppings from '../actions/toppings.action';

import { Topping } from '../../models/toppings.model';

export interface ToppingState {
  entities: { [id: number]: Topping };
  loaded: boolean;
  loading: boolean;
  selectedToppings: number[];
}

export const initialState: ToppingState = {
  entities: {},
  loaded: false,
  loading: false,
  selectedToppings: [],
};

export const toppingsReducer = createReducer(
  initialState,
  on(fromToppings.visualiseToppings, (state, { payload }) => ({
    ...state,
    selectedToppings: payload,
  })),
  on(fromToppings.loadToppings, (state) => ({ ...state, loading: true })),
  on(fromToppings.loadToppingsFail, (state) => ({
    ...state,
    loaded: false,
    loading: false,
  })),
  on(fromToppings.loadToppingsSuccess, (state, { payload }) => {
    payload;

    const entities = payload.reduce(
      (entities: { [id: number]: Topping }, topping: Topping) => {
        return {
          ...entities,
          [topping.id as number]: topping,
        };
      },
      {
        ...state.entities,
      }
    );

    console.log(entities);

    return {
      ...state,
      entities,
      loaded: true,
      loading: false,
    };
  })
);

export const getSelectedToppings = (state: ToppingState) =>
  state.selectedToppings;
export const getToppingsEntities = (state: ToppingState) => state.entities;
export const getToppingsLoaded = (state: ToppingState) => state.loaded;
export const getToppingsLoading = (state: ToppingState) => state.loading;
