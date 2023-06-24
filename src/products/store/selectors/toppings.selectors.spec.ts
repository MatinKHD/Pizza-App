import { TestBed } from '@angular/core/testing';
import { StoreModule, Store, combineReducers } from '@ngrx/store';

import * as fromRoot from '../../../app/store/reducers';
import * as fromReducers from '../reducers';
import * as fromActions from '../actions';
import * as fromSelectors from './toppings.selectors';

import { Topping } from '../../models/toppings.model';

describe('Toppings Selectors', () => {
  let store: Store<fromReducers.ProductsState>;

  const toppings: Topping[] = [
    { id: 1, name: 'beacon' },
    { id: 2, name: 'pepproni' },
    { id: 3, name: 'basil' },
  ];

  const entities = {
    1: toppings[0],
    2: toppings[1],
    3: toppings[2],
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

  describe('Get Topppings Entities', () => {
    it('should  return toppings as entities', () => {
      let result: any;

      store.select(fromSelectors.getToppingsEntities).subscribe((v) => {
        result = v;
      });

      expect(result).toEqual({});

      store.dispatch(fromActions.loadToppingsSuccess({ payload: toppings }));

      expect(result).toEqual(entities);
    });
  });
  describe('Get Selected Toppings', () => {
    it('should return ids of toppings as array of number', () => {
      let result: any;

      store
        .select(fromSelectors.getSelectedToppings)
        .subscribe((v) => (result = v));

      store.dispatch(fromActions.loadToppingsSuccess({ payload: toppings }));

      expect(result).toEqual([]);

      store.dispatch(fromActions.visualiseToppings({ payload: [1, 2] }));

      expect(result).toEqual([1, 2]);
    });
  });
  describe('Get All Toppings', () => {
    it('should return entities as toppings array', () => {
      let result: any;

      store
        .select(fromSelectors.getToppingsEntities)
        .subscribe((v) => (result = v));

      store.dispatch(fromActions.loadToppingsSuccess({ payload: toppings }));

      expect(result).toEqual(entities);
    });
  });
  describe('Get Toppings Loaded', () => {
    it('should return the toppings loaded state', () => {
      let result: any;

      store
        .select(fromSelectors.getToppingsLoaded)
        .subscribe((v) => (result = v));

      expect(result).toEqual(false);

      store.dispatch(fromActions.loadToppingsSuccess({ payload: toppings }));

      expect(result).toEqual(true);
    });
  });
  describe('Get Toppings Loading', () => {
    it('should return the toppings loading state', () => {
      let result: any;

      store
        .select(fromSelectors.getToppingsLoading)
        .subscribe((v) => (result = v));

      expect(result).toEqual(false);

      store.dispatch(fromActions.loadToppings());

      expect(result).toEqual(true);

      store.dispatch(fromActions.loadToppingsSuccess({ payload: toppings }));

      expect(result).toEqual(false);
    });
  });
});
