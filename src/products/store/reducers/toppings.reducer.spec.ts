import * as fromToppings from './toppings.reducer';
import * as fromActions from '../actions/toppings.action';

import { Topping } from '../../models/toppings.model';

describe('Topping Reducer', () => {
  describe('undefiend action', () => {
    it('should return defualt state', () => {
      const { initialState } = fromToppings;
      const action = {} as any;
      const state = fromToppings.toppingsReducer(undefined, action);

      expect(state).toEqual(initialState);
    });
  });
  describe('VISUALISE_TOPPINGS action', () => {
    it('it should add the selected toppings to the state', () => {
      const payload = [1, 2, 3];
      const { initialState } = fromToppings;
      const action = fromActions.visualiseToppings({ payload });
      const state = fromToppings.toppingsReducer(initialState, action);

      expect(state.entities).toEqual({});
      expect(state.selectedToppings).toEqual(payload);
      expect(state.loaded).toEqual(false);
      expect(state.loading).toEqual(false);
    });
  });
  describe('LOAD_TOPPINGS action', () => {
    it('should set the loading to true', () => {
      const { initialState } = fromToppings;
      const action = fromActions.loadToppings();
      const state = fromToppings.toppingsReducer(initialState, action);

      expect(state.entities).toEqual({});
      expect(state.selectedToppings).toEqual([]);
      expect(state.loaded).toEqual(false);
      expect(state.loading).toEqual(true);
    });
  });
  describe('LOAD_TOPPINGS_FAIL action', () => {
    it('should return initial state', () => {
      const payload = { message: 'error' };
      const { initialState } = fromToppings;
      const action = fromActions.loadToppingsFail({ payload });
      const state = fromToppings.toppingsReducer(initialState, action);

      expect(state).toEqual(initialState);
    });
    it('should return pervious state', () => {
      const payload = { message: 'error' };
      const { initialState } = fromToppings;
      const periviousState = { ...initialState, loading: true };
      const action = fromActions.loadToppingsFail({ payload });
      const state = fromToppings.toppingsReducer(periviousState, action);

      expect(state).toEqual(initialState);
    });
  });
  describe('LOAD_TOPPINGS_SUCCESS', () => {
    it('should map an array to entities', () => {
      const payload: Topping[] = [{ id: 1, name: 'Topping #1' }];
      const entities = {
        1: payload[0],
      };

      const { initialState } = fromToppings;
      const action = fromActions.loadToppingsSuccess({ payload });
      const state = fromToppings.toppingsReducer(initialState, action);

      expect(state.entities).toEqual(entities);
    });
  });
});

describe('Topping Reducer Selectors', () => {
  describe('Get Toppings Enitites', () => {
    it('should return .entities', () => {
      const { initialState } = fromToppings;
      const entities: { [key: number]: Topping } = {
        1: { id: 1, name: 'Topping #1' },
        2: { id: 2, name: 'Topping #2' },
      };
      const previousState = { ...initialState, entities };
      const slice = fromToppings.getToppingsEntities(previousState);

      expect(slice).toEqual(entities);
    });
  });
  describe('Get SelectedToppings', () => {
    it('should return .selectedToppings', () => {
      const { initialState } = fromToppings;
      const selectedToppings = [1, 2, 3];
      const previousState = { ...initialState, selectedToppings };
      const slice = fromToppings.getSelectedToppings(previousState);

      expect(slice).toEqual([1, 2, 3]);
    });
  });
  describe(' Get Topping Loaded', () => {
    it('should return .loaded', () => {
      const { initialState } = fromToppings;
      const loaded: boolean = false;
      const previousState = { ...initialState, loaded };
      const slice = fromToppings.getToppingsLoaded(previousState);

      expect(slice).toEqual(false);
    });
  });
  describe(' Get Topping Loading', () => {
    it('should return .loading', () => {
      const { initialState } = fromToppings;
      const loading: boolean = false;
      const previousState = { ...initialState, loading };
      const slice = fromToppings.getToppingsLoading(previousState);

      expect(slice).toEqual(false);
    });
  });
});
