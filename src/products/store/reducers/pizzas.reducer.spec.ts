import * as fromPizzas from './pizzas.reducer';
import * as fromActions from '../actions/pizzas.action';

import { Pizza } from '../../models/pizza.model';

describe('Pizza Reducer', () => {
  describe('undefiend action', () => {
    it('should return defulat state', () => {
      const { initialState } = fromPizzas;
      const action = {} as any;

      const state = fromPizzas.pizzasReducers(undefined, action);

      expect(state).toEqual(initialState);
    });
  });
  describe('LOAD_PIZZAS', () => {
    it('should set loading to true', () => {
      const { initialState } = fromPizzas;
      const action = fromActions.loadPizzas();
      const state = fromPizzas.pizzasReducers(initialState, action);

      expect(state.entities).toEqual({});
      expect(state.loaded).toEqual(false);
      expect(state.loading).toEqual(true);
    });
  });
  describe('LOAD_PIZZAS_SUCCESS action', () => {
    it('should map an array to entities', () => {
      const pizzas: Pizza[] = [
        { id: 1, name: 'Pizza #1', toppings: [] },
        { id: 2, name: 'Pizza #2', toppings: [] },
      ];
      const entities = {
        1: pizzas[0],
        2: pizzas[1],
      };
      const { initialState } = fromPizzas;
      const action = fromActions.loadPizzasSuccess({ payload: pizzas });
      const state = fromPizzas.pizzasReducers(initialState, action);

      expect(state.entities).toEqual(entities);
      expect(state.loaded).toEqual(true);
      expect(state.loading).toEqual(false);
    });
  });
  describe('LOAD_PIZZAS_FAIL action', () => {
    it('should return initial state', () => {
      const error = { message: 'error' };
      const { initialState } = fromPizzas;
      const action = fromActions.loadPizzasFail({ payload: error });
      const state = fromPizzas.pizzasReducers(initialState, action);

      expect(state).toEqual(initialState);
    });
    it('should return previous state', () => {
      const error = { message: 'error' };
      const { initialState } = fromPizzas;
      const previousState = { ...initialState, loading: true };
      const action = fromActions.loadPizzasFail({ payload: error });
      const state = fromPizzas.pizzasReducers(previousState, action);

      expect(state).toEqual(initialState);
    });
  });
  describe('CREATE_PIZZAS_SUCCESS action', () => {
    it('should create new pizza and add to state', () => {
      const payload: Pizza = { id: 1, name: 'Pizza #1', toppings: [] };
      const { initialState } = fromPizzas;
      const action = fromActions.createPizzaSuccess({ payload });
      const state = fromPizzas.pizzasReducers(initialState, action);
      const entities = {
        ...state.entities,
        1: payload,
      };

      expect(state.entities).toEqual(entities);
      expect(state.loaded).toEqual(false);
      expect(state.loading).toEqual(false);
    });
  });
  describe('UPDATE_PIZZAS_SUCCESS action', () => {
    it('should update exitisting pizza', () => {
      const payload: Pizza = { id: 1, name: 'Pizza #1', toppings: [] };
      const { initialState } = fromPizzas;
      const action = fromActions.updatePizzaSuccess({ payload });
      const state = fromPizzas.pizzasReducers(initialState, action);
      const entities = {
        ...state.entities,
        1: payload,
      };

      expect(state.entities).toEqual(entities);
      expect(state.loaded).toEqual(false);
      expect(state.loading).toEqual(false);
    });
  });
  describe('REMOVE_PIZZA_SUCCEES action', () => {
    it('should remove existing pizza', () => {
      const payload: Pizza = { id: 1, name: 'Pizza #1', toppings: [] };
      const { initialState } = fromPizzas;
      const action = fromActions.removePizaaSuccess({ payload });
      const state = fromPizzas.pizzasReducers(initialState, action);

      const { [payload.id as number]: removed, ...entities } = state.entities;

      expect(state.entities).toEqual(entities);
      expect(state.loaded).toEqual(false);
      expect(state.loading).toEqual(false);
    });
  });
});
describe('Pizza Reducer Selectors', () => {
  describe('Get Pizzas Entites', () => {
    it('should return .entities', () => {
      const { initialState } = fromPizzas;
      const entities: { [key: number]: Pizza } = {
        1: { id: 1, name: 'Pizza #1', toppings: [] },
        2: { id: 2, name: 'Pizza #2', toppings: [] },
      };
      const perviousState = { ...initialState, entities };
      const slice = fromPizzas.getPizzasEntities(perviousState);

      expect(slice).toEqual(entities);
    });
  });
  describe('Get Pizza Loading', () => {
    it('should return .loading', () => {
      const loading = false;
      const { initialState } = fromPizzas;
      const perviousState = { ...initialState, loading };
      const slice = fromPizzas.getPizzasLoading(perviousState);

      expect(slice).toEqual(loading);
    });
  });
  describe('Get Pizza loaded', () => {
    it('should return .loaded', () => {
      const loaded = false;
      const { initialState } = fromPizzas;
      const perviousState = { ...initialState, loaded };
      const slice = fromPizzas.getPizzasLoaded(perviousState);

      expect(slice).toEqual(loaded);
    });
  });
});
