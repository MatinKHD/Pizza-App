import { TestBed } from '@angular/core/testing';
import { StoreModule, Store, combineReducers } from '@ngrx/store';

import * as fromRoot from '../../../app/store/reducers';
import * as fromReducers from '../reducers';
import * as fromActions from '../actions';
import * as fromSelectors from './pizzas.selectors';

import { Pizza } from '../../models/pizza.model';

describe('Pizzas Selectors', () => {
  let store: Store<fromReducers.ProductsState>;

  const pizza1: Pizza = {
    id: 1,
    name: 'Pizza #1',
    toppings: [{ id: 1, name: 'Toppings #1' }],
  };
  const pizza2: Pizza = {
    id: 2,
    name: 'Pizza #2',
    toppings: [
      { id: 1, name: 'Toppings #1' },
      { id: 2, name: 'Toppings #2' },
    ],
  };
  const pizza3: Pizza = {
    id: 3,
    name: 'Pizza #3',
    toppings: [
      { id: 1, name: 'Toppings #1' },
      { id: 2, name: 'Toppings #2' },
      { id: 3, name: 'Toppings #3' },
    ],
  };
  const pizzas: Pizza[] = [pizza1, pizza2, pizza3];
  const entities = {
    1: pizzas[0],
    2: pizzas[1],
    3: pizzas[2],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          products: combineReducers(fromReducers.reducers),
        }),
      ],
    });
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });
  describe(' Get Pizza State', () => {
    it('should return state of pizza store', () => {
      let result: any;

      store.select(fromSelectors.pizzaState).subscribe((v) => (result = v));

      expect(result).toEqual({
        entities: {},
        loaded: false,
        loading: false,
      });

      store.dispatch(fromActions.loadPizzasSuccess({ payload: pizzas }));

      expect(result).toEqual({
        entities,
        loaded: true,
        loading: false,
      });
    });
  });
  describe('Get Pizzas Entities', () => {
    it('should return pizzas as entities', () => {
      let result: any;

      store
        .select(fromSelectors.getPizzasEntites)
        .subscribe((v) => (result = v));
      expect(result).toEqual({});

      store.dispatch(fromActions.loadPizzasSuccess({ payload: pizzas }));

      expect(result).toEqual(entities);
    });
  });
  describe('Get All Pizzas', () => {
    it('should return all pizzas as entiteis', () => {
      let result: any;

      store.select(fromSelectors.getAllPizzas).subscribe((v) => (result = v));
      expect(result).toEqual([]);

      store.dispatch(fromActions.loadPizzasSuccess({ payload: pizzas }));

      expect(result).toEqual(pizzas);
    });
  });
  describe('Get Selected Pizza', () => {
    it('should return selected pizza as entitie', () => {
      let result: any;
      let params: any;

      store.dispatch(fromActions.loadPizzasSuccess({ payload: pizzas }));

      store.dispatch({
        type: '@ngrx/router-store/navigated',
        payload: {
          routerState: {
            url: '/products/2',
            queryParams: {},
            params: { pizzaId: '2' },
          },
          event: {},
        },
      });

      store
        .select(fromRoot.getRouteState)
        .subscribe((routerState) => (params = routerState.state.params));
      store
        .select(fromSelectors.getSelectedPizza)
        .subscribe((selectedPizza) => (result = selectedPizza));

      expect(result).toEqual(entities[2]);
    });
  });
});
