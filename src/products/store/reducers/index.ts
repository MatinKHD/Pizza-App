import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';

import * as fromPizzas from './pizzas.reducer';
import * as fromToppings from './toppings.reducer';

export interface ProductsState {
  pizzas: fromPizzas.PizzaState;
  toppings: fromToppings.ToppingState;
}

export const reducers: ActionReducerMap<ProductsState> = {
  pizzas: fromPizzas.pizzasReducers,
  toppings: fromToppings.toppingsReducer,
};

export const getProductState = createFeatureSelector<ProductsState>('products');
