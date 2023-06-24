import { Injectable } from '@angular/core';

import { ofType, Actions, createEffect } from '@ngrx/effects';
import * as toppingActions from '../actions/toppings.action';
import { of, switchMap, map, catchError } from 'rxjs';

import * as fromServices from '../../services';

@Injectable()
export class ToppingsEffect {
  constructor(
    private toppingsService: fromServices.ToppingsService,
    private actions$: Actions
  ) {}

  loadToppings$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(toppingActions.LOAD_TOPPINGS),
      switchMap(() =>
        this.toppingsService.getToppings().pipe(
          map((topping) =>
            toppingActions.loadToppingsSuccess({ payload: topping })
          ),
          catchError((error) =>
            of(toppingActions.loadToppingsFail({ payload: error }))
          )
        )
      )
    );
  });
}
