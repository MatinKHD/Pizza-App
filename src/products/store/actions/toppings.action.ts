import { createAction, props } from '@ngrx/store';

import { Topping } from '../../models/toppings.model';

export const LOAD_TOPPINGS = '[Products] Load Toppings';
export const LOAD_TOPPINGS_FAIL = '[Products] Load Toppings Fail';
export const LOAD_TOPPINGS_SUCCESS = '[Products] Load Toppings Success';
export const VISUALISE_TOPPINGS = '[Products] Visualise Toppings';

export const loadToppings = createAction(LOAD_TOPPINGS);

export const loadToppingsFail = createAction(
  LOAD_TOPPINGS_FAIL,
  props<{ payload: any }>()
);

export const loadToppingsSuccess = createAction(
  LOAD_TOPPINGS_SUCCESS,
  props<{ payload: Topping[] }>()
);

export const visualiseToppings = createAction(
  VISUALISE_TOPPINGS,
  props<{ payload: number[] }>()
);
