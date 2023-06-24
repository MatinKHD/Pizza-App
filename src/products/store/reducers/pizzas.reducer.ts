import { createReducer, on, Action } from '@ngrx/store';
import * as pizzasActions from '../actions/pizzas.action';

import { Pizza } from '../../models/pizza.model';

export interface PizzaState {
  entities: { [id: number]: Pizza };
  loaded: boolean;
  loading: boolean;
}

export const initialState: PizzaState = {
  entities: {},
  loaded: false,
  loading: false,
};

export const pizzasReducers = createReducer(
  initialState,
  on(pizzasActions.loadPizzas, (state) => ({ ...state, loading: true })),
  on(pizzasActions.loadPizzasSuccess, (state, { payload }) => {
    const entities = payload.reduce(
      (entities: { [id: number]: Pizza }, pizza: Pizza) => {
        return {
          ...entities,
          [pizza.id as number]: pizza,
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
      loading: false,
      loaded: true,
    };
  }),
  on(pizzasActions.loadPizzasFail, (state) => ({
    ...state,
    loading: false,
    loaded: false,
  })),
  on(
    pizzasActions.createPizzaSuccess,
    pizzasActions.updatePizzaSuccess,
    (state, { payload }) => {
      const entities = { ...state.entities, [payload.id as number]: payload };

      return { ...state, entities };
    }
  ),
  on(pizzasActions.removePizaaSuccess, (state, { payload: pizza }) => {
    const { [pizza.id as number]: removed, ...entities } = state.entities;
    return { ...state, entities };
  })
);

export const getPizzasEntities = (state: PizzaState) => state.entities;
export const getPizzasLoading = (state: PizzaState) => state.loading;
export const getPizzasLoaded = (state: PizzaState) => state.loaded;
