import { createSelector, createFeatureSelector } from '@ngrx/store';

import * as fromRoot from '../../../app/store';
import * as fromFeature from '../reducers';
import * as fromPizzas from '../reducers/pizzas.reducer';
import * as fromToppings from './toppings.selectors';

import { Pizza } from '../../models/pizza.model';

export const pizzaState = createSelector(
  fromFeature.getProductState,
  (state) => state.pizzas
);

export const getPizzasEntites = createSelector(
  pizzaState,
  fromPizzas.getPizzasEntities
);

export const getAllPizzas = createSelector(getPizzasEntites, (entities) => {
  return Object.keys(entities).map((id) => entities[parseInt(id, 10)]);
});

export const getSelectedPizza = createSelector(
  getPizzasEntites,
  fromRoot.getRouteState,
  (entities, router): Pizza => {
    return router.state && entities[router.state.params['pizzaId']];
  }
);

export const getPizzaViusalised = createSelector(
  getSelectedPizza,
  fromToppings.getToppingsEntities,
  fromToppings.getSelectedToppings,
  (pizza, toppingEntities, selectedToppings) => {
    const toppings = selectedToppings.map((id) => toppingEntities[id - 1]);

    return { ...pizza, toppings };
  }
);

export const getPizzasLoaded = createSelector(
  pizzaState,
  fromPizzas.getPizzasLoaded
);

export const getPizzasLoading = createSelector(
  pizzaState,
  fromPizzas.getPizzasLoading
);
