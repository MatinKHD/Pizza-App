import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../app/store';
import * as fromFeature from '../reducers';
import * as fromToppings from '../reducers/toppings.reducer';

import { Topping } from '../../models/toppings.model';

export const toppingState = createSelector(
  fromFeature.getProductState,
  (state) => state.toppings
);

export const getToppingsEntities = createSelector(
  toppingState,
  fromToppings.getToppingsEntities
);

export const getSelectedToppings = createSelector(
  toppingState,
  fromToppings.getSelectedToppings
);

export const getAllToppings = createSelector(getToppingsEntities, (entities) =>
  Object.keys(entities).map((id) => entities[parseInt(id, 10)])
);

export const getToppingsLoaded = createSelector(
  toppingState,
  fromToppings.getToppingsLoaded
);

export const getToppingsLoading = createSelector(
  toppingState,
  fromToppings.getToppingsLoading
);
