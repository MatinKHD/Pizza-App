import { createAction, props } from '@ngrx/store';

import { NavigationExtras } from '@angular/router';

export const GO = '[Router] Go';
export const BACK = '[Router] Back';
export const FORWARD = '[Router] Forward';

export const go = createAction(
  GO,
  props<{
    payload: { path: any[]; query?: object; extras?: NavigationExtras };
  }>()
);

export const back = createAction(BACK);

export const forward = createAction(FORWARD);

export type Navigate = {
  path: any[];
  query?: object;
  extras?: NavigationExtras;
};
