import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { createEffect, Actions, ofType } from '@ngrx/effects';
import * as routerActions from '../actions/router.action';

import { tap, map } from 'rxjs';

@Injectable()
export class RouterEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private location: Location
  ) {}

  navigate$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(routerActions.GO),
        map(
          (action: { type: string; payload: routerActions.Navigate }) =>
            action.payload
        ),
        tap(({ path, query: queryParams, extras }) =>
          this.router.navigate(path, { queryParams, ...extras })
        )
      );
    },
    { dispatch: false }
  );

  navigateBack$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(routerActions.BACK),
        tap(() => this.location.back())
      );
    },
    { dispatch: false }
  );

  navigateForward$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(routerActions.FORWARD),
        tap(() => this.location.forward())
      );
    },
    { dispatch: false }
  );
}
