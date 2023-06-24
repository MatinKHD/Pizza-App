import { createAction, props } from '@ngrx/store';

import { Pizza } from '../../models/pizza.model';

//load pizza
export const LOAD_PIZZAS = '[Products] Load Pizzas';
export const LOAD_PIZZAS_FAIL = '[Products] Load Pizzas fail';
export const LOAD_PIZZAS_SUCCESS = '[Products] Load Pizzas success';

export const loadPizzas = createAction(LOAD_PIZZAS);

export const loadPizzasFail = createAction(
  LOAD_PIZZAS_FAIL,
  props<{ payload: any }>()
);

export const loadPizzasSuccess = createAction(
  LOAD_PIZZAS_SUCCESS,
  props<{ payload: Pizza[] }>()
);

// create pizza

export const CREATE_PIZZA = '[Products] Create Pizza';
export const CREATE_PIZZA_FAIL = '[Products] Create Pizza Fail';
export const CREATE_PIZZA_SUCCESS = '[Products] Create Pizza Success';

export const createPizza = createAction(
  CREATE_PIZZA,
  props<{ payload: Pizza }>()
);

export const createPizzaFail = createAction(
  CREATE_PIZZA_FAIL,
  props<{ payload: any }>()
);

export const createPizzaSuccess = createAction(
  CREATE_PIZZA_SUCCESS,
  props<{ payload: Pizza }>()
);

//update pizza

export const UPDATE_PIZZA = '[Products] Update Pizza';
export const UPDATE_PIZZA_FAIL = '[Products] Update Pizza Fail';
export const UPDATE_PIZZA_SUCCESS = '[Products] Update Pizza Success';

export const updatePizza = createAction(
  UPDATE_PIZZA,
  props<{ payload: Pizza }>()
);

export const updatePizzaFail = createAction(
  UPDATE_PIZZA_FAIL,
  props<{ payload: any }>()
);

export const updatePizzaSuccess = createAction(
  UPDATE_PIZZA_SUCCESS,
  props<{ payload: Pizza }>()
);

//remove pizza

export const REMOVE_PIZZA = '[Products] Remove Pizza';
export const REMOVE_PIZZA_FAIL = '[Products] Remove Pizza Fail';
export const REMOVE_PIZZA_SUCCESS = '[Products] Remove Pizza Success';

export const removePizza = createAction(
  REMOVE_PIZZA,
  props<{ payload: Pizza }>()
);

export const removePizzaFail = createAction(
  REMOVE_PIZZA_FAIL,
  props<{ payload: any }>()
);

export const removePizaaSuccess = createAction(
  REMOVE_PIZZA_SUCCESS,
  props<{ payload: Pizza }>()
);
