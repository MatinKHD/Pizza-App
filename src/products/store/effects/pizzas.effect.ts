import { Injectable } from '@angular/core';
import * as fromServices from '../../services';

import { createEffect, Actions, ofType } from '@ngrx/effects';

import * as fromRoot from '../../../app/store';
import * as pizzaActions from '../actions/pizzas.action';

import { of, map, switchMap, catchError, tap } from 'rxjs';
import { Pizza } from '../../models/pizza.model';

@Injectable()
export class PizzasEffects {
  constructor(
    private actions$: Actions,
    private pizzasService: fromServices.PizzasService
  ) {}

  // @Effect()
  // loadPizzas$ = this.actions$.pipe(
  //   ofType(pizzaActions.LOAD_PIZZAS),
  //   switchMap(() =>
  //     this.pizzasService.getPizzas().pipe(
  //       map((pizzas) => pizzaActions.loadPizzasSuccess({ payload: pizzas })),
  //       catchError((error) =>
  //         of(pizzaActions.loadPizzasFail({ payload: error }))
  //       )
  //     )
  //   )
  // );

  loadPizzas$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(pizzaActions.LOAD_PIZZAS),
      switchMap(() =>
        this.pizzasService.getPizzas().pipe(
          map((pizzas) => pizzaActions.loadPizzasSuccess({ payload: pizzas })),
          catchError((error) =>
            of(pizzaActions.loadPizzasFail({ payload: error }))
          )
        )
      )
    );
  });

  createPizza$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(pizzaActions.CREATE_PIZZA),
      map((action: { type: string; payload: Pizza }) => action.payload),
      switchMap((pizza) =>
        this.pizzasService.createPizza(pizza).pipe(
          map((pizza) => pizzaActions.createPizzaSuccess({ payload: pizza })),
          catchError((error) => {
            console.log(error);
            return of(pizzaActions.createPizzaFail({ payload: error }));
          })
        )
      )
    );
  });

  createPizzaSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(pizzaActions.CREATE_PIZZA_SUCCESS),
      map((action: { type: string; payload: Pizza }) => {
        console.log('mapping payload');
        return action.payload;
      }),
      map((pizza) => {
        console.log('createPizzaSucces');
        return fromRoot.go({
          payload: { path: ['/products', pizza.id] },
        });
      })
    );
  });

  updatePizza$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(pizzaActions.UPDATE_PIZZA),
      map((action: { type: string; payload: Pizza }) => action.payload),
      switchMap((pizza) =>
        this.pizzasService.updatePizza(pizza).pipe(
          map((pizza) => pizzaActions.updatePizzaSuccess({ payload: pizza })),
          catchError((err) =>
            of(pizzaActions.updatePizzaFail({ payload: err }))
          )
        )
      )
    );
  });

  removePizzas$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(pizzaActions.REMOVE_PIZZA),
      map((action: { type: string; payload: Pizza }) => action.payload),
      switchMap((pizza: Pizza) =>
        this.pizzasService.removePizza(pizza).pipe(
          map(() => pizzaActions.removePizaaSuccess({ payload: pizza })),
          catchError((err) =>
            of(pizzaActions.removePizzaFail({ payload: err }))
          )
        )
      )
    );
  });

  handlePizzaSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        pizzaActions.UPDATE_PIZZA_SUCCESS,
        pizzaActions.REMOVE_PIZZA_SUCCESS
      ),
      map(() =>
        fromRoot.go({
          payload: { path: ['/products'] },
        })
      )
    );
  });
}
